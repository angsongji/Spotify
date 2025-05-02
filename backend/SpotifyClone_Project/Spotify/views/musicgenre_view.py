
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models.music_genres_models import MusicGenres
from ..serializers.musicgenre_serializer import MusicGenreSerializer

@api_view(['GET'])
def get_music_genres(request):
    genres = MusicGenres.objects.all()
    serializer = MusicGenreSerializer(genres, many=True)
    return Response(serializer.data)
