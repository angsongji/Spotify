
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models.music_genres_models import MusicGenres
from ..serializers.musicgenre_serializer import MusicGenreSerializer

@api_view(['GET'])
def get_music_genres(request):
    genres = MusicGenres.objects.all()
    serializer = MusicGenreSerializer(genres, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_music_genre(request):
    if request.method == 'POST':
        serializer = MusicGenreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
def delete_music_genre(request, pk):
    try:
        genre = MusicGenres.objects.get(pk=pk)
    except MusicGenres.DoesNotExist:
        return Response({"detail": "Genre not found."}, status=status.HTTP_404_NOT_FOUND)

    genre.delete()
    return Response({"detail": "Genre deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
