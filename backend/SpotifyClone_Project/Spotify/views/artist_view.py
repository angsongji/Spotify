from rest_framework.views import APIView
from Spotify.models.artist_models import Artist
from rest_framework.response import Response
from ..serializers.artist_serializer import ArtistSerializer

class ArtistListAPIView(APIView):
    def get(self, request):
        artists = Artist.objects.all()
        serializer = ArtistSerializer(artists, many=True)
        return Response(serializer.data)
