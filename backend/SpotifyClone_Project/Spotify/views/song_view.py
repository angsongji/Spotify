# views.py
from rest_framework.views import APIView
from Spotify.models.song_models import Song
from Spotify.serializers.song_serializers import SongSerializer
from rest_framework.response import Response
from rest_framework import status

class SongListAPIView(APIView):
    def get(self, request):
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
