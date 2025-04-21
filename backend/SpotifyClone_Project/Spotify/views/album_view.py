from rest_framework.views import APIView
from Spotify.models.album_models import Album
from rest_framework.response import Response
from ..serializers.album_serializer import AlbumSerializer

class AlbumListAPIView(APIView):
    def get(self, request):
        albums = Album.objects.all()
        serializer = AlbumSerializer(albums, many=True)
        return Response(serializer.data)
