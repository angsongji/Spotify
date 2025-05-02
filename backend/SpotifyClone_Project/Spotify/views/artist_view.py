from rest_framework.views import APIView
from Spotify.models.artist_models import Artist
from rest_framework.response import Response
from ..serializers.artist_serializer import ArtistSerializer
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from ..models.song_models import  Song
from django.views.decorators.csrf import csrf_exempt


class ArtistListAPIView(APIView):
    def get(self, request):
        artists = Artist.objects.all()
        serializer = ArtistSerializer(artists, many=True)
        return Response(serializer.data)


@csrf_exempt
def get_artist_songs(request, account_id):  # <- Thêm đối số này
    artist = get_object_or_404(Artist, account_id=account_id)
    
    songs = Song.objects.filter(artist_id=artist.id)

    song_list = [{
        'name': song.name,
        'release_date': song.release_date,
        'cover_image_url': song.cover_image_url,
        'duration': song.duration,
        'plays': song.plays,
        'album_id': song.album_id.id if song.album_id else None,
        'is_approved': song.is_approved,
        'audio_file_url': song.audio_file_url,
        'premium': song.premium,
    } for song in songs]

    return JsonResponse({'songs': song_list})

