from rest_framework.views import APIView
from Spotify.models.album_models import Album
from Spotify.models.song_models import Song
from rest_framework.response import Response
from ..serializers.album_serializer import AlbumSerializer
from ..serializers.song_serializers import SongSerializer

from rest_framework import status

class AlbumListAPIView(APIView):
    def get(self, request):
        albums = Album.objects.all()
        serializer = AlbumSerializer(albums, many=True)
        return Response(serializer.data)

class AlbumDetailAPIView(APIView):
    def get(self, request, id):
        try:
            album = Album.objects.get(id=id)
            serializer = AlbumSerializer(album)
            return Response(serializer.data)
        except Album.DoesNotExist:
            return Response({"error": "Album not found"}, status=status.HTTP_404_NOT_FOUND)
        
class SongByAlbumAPIView(APIView):
    def get(self, request, album_id):
        songs = Song.objects.filter(album_id_id=album_id)
        serializer = SongSerializer(songs, many=True)
        return Response(serializer.data)