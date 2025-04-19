from rest_framework.views import APIView
from Spotify.models.song_models import Song
from rest_framework.response import Response
from Spotify.serializers.song_serializers import SongSerializer

class SongListAPIView(APIView):
    def get(self, request):
        songs = Song.objects.all()
        serializer = SongSerializer(songs, many=True)
        return Response(serializer.data)