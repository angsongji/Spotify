from rest_framework.views import APIView
from rest_framework import status, viewsets
from rest_framework.response import Response
from datetime import date


import requests
import os
from mutagen.mp3 import MP3
from tempfile import NamedTemporaryFile
from Spotify.models.song_models import Song
from Spotify.serializers.song_serializers import SongSerializer


class SongListAPIView(APIView):
    def get(self, request):
        # Lọc bài hát đã được kiểm duyệt
        songs = Song.objects.filter(is_approved=True)
        serializer = SongSerializer(songs, many=True)
        return Response(serializer.data)

class SongAllInListAPIView(APIView):
    def get(self, request):
        # Lọc bài hát đã được kiểm duyệt
        songs = Song.objects.all()
        serializer = SongSerializer(songs, many=True)
        return Response(serializer.data)

class SongDetailAPIView(APIView):
    def get(self, request, id):
        try:
            song = Song.objects.get(id=id)
        except Song.DoesNotExist:
            return Response({'error': 'Song not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = SongSerializer(song)
        return Response(serializer.data)


class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        
        print("=== Create Song ===")
        print("Incoming data:", data)

        data['release_date'] = date.today()
        data['plays'] = 0

        audio_url = data.get('audio_file_url')
        try:
            data['duration'] = self.get_audio_duration(audio_url)
        except Exception as e:
            print("Lỗi khi lấy duration:", e)
            return Response({"error": "Cannot get duration"}, status=500)

        serializer = self.get_serializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print("Serializer error:", e)
            return Response({"error": str(e)}, status=400)


    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = request.data.copy()
        data['release_date'] = date.today()
        # Nếu có audio mới, tính lại duration
        audio_url = data.get('audio_file_url')
        if audio_url and audio_url != instance.audio_file_url:
            data['duration'] = self.get_audio_duration(audio_url)
        else:
            data['duration'] = instance.duration

        # Cập nhật dữ liệu bài hát
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

    def get_audio_duration(self, file_url):
        duration = 0
        if file_url:
            try:
                response = requests.get(file_url, stream=True)
                if response.status_code == 200:
                    with NamedTemporaryFile(delete=False, suffix=".tmp") as tmp_file:
                        for chunk in response.iter_content(chunk_size=1024):
                            if chunk:
                                tmp_file.write(chunk)
                        tmp_file.flush()
                        tmp_path = tmp_file.name

                    if file_url.lower().endswith(".mp3"):
                        audio = MP3(tmp_path)
                        duration = int(audio.info.length)
                    
            except Exception as e:
                print("Lỗi khi lấy thời lượng audio:", e)
            finally:
                if os.path.exists(tmp_path):
                    os.remove(tmp_path)
        return duration

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

