from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models.user_models import User

from rest_framework import status

from Spotify.models.playlist_models import Playlist
from Spotify.models.playlist_songs_models import Playlist_Song
from Spotify.models.song_models import Song
from ..serializers.playlist_serializer import PlaylistSerializer,PlaylistSongSerializer
from ..serializers.song_serializers import SongSerializer

@api_view(['GET'])
def get_playlists_by_account(request, account_id):
    try:
        user = User.objects.get(account_id=account_id)
        playlists = Playlist.objects.filter(user=user)
        serializer = PlaylistSerializer(playlists, many=True)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)
    

class PlaylistDetailAPIView(APIView):
    def get(self, request, id):
        try:
            playlist = Playlist.objects.get(id=id)
            serializer = PlaylistSerializer(playlist)
            return Response(serializer.data)
        except Playlist.DoesNotExist:
            return Response({"error": "Playlist not found"}, status=status.HTTP_404_NOT_FOUND)

class SongByPlaylistAPIView(APIView):
    def get(self, request, playlist_id):
        # Lấy danh sách Playlist_Song cho playlist_id cụ thể
        playlist_songs = Playlist_Song.objects.filter(playlist_id=playlist_id)
        
        # Lấy các bài hát từ Playlist_Song
        songs = [ps.song_id for ps in playlist_songs]
        
        # Serializer các bài hát đã lấy
        serializer = SongSerializer(songs, many=True)
        
        # Trả về kết quả
        return Response(serializer.data)
    
class PlaylistSongCreateView(APIView):
    def post(self, request):
        playlist_id = request.data.get('playlist_id')
        song_id = request.data.get('song_id')
        added_at = request.data.get('added_at')  # Thông tin này có thể bỏ qua nếu dùng auto_now_add

        # Kiểm tra xem playlist_id và song_id có được cung cấp không
        if not playlist_id or not song_id:
            return Response({'error': 'Missing playlist_id or song_id'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Lấy playlist và song từ ID
            playlist = Playlist.objects.get(id=playlist_id)
            song = Song.objects.get(id=song_id)

            # Kiểm tra nếu bài hát đã có trong playlist
            if Playlist_Song.objects.filter(playlist_id=playlist_id, song_id=song_id).exists():
                return Response({'error': 'Song already in playlist'}, status=status.HTTP_409_CONFLICT)

            # Tạo mới mối quan hệ Playlist_Song
            playlist_song = Playlist_Song.objects.create(
                playlist_id=playlist,
                song_id=song,
                added_at=added_at  
            )

            # Serialize đối tượng Playlist_Song và trả về kết quả
            serializer = PlaylistSongSerializer(playlist_song)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Playlist.DoesNotExist:
            return Response({'error': 'Playlist not found'}, status=status.HTTP_404_NOT_FOUND)
        except Song.DoesNotExist:
            return Response({'error': 'Song not found'}, status=status.HTTP_404_NOT_FOUND)