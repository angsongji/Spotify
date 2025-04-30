from django.http import JsonResponse
from django.db.models import Q
from ..models.song_models import Song
from ..models import Album
from ..models import Artist


def Search(request):
    q = request.GET.get('q', '').strip()

    if not q:
        return JsonResponse([], safe=False)

    results = []

    songs = Song.objects.filter(name__icontains=q)
    artists = Artist.objects.filter(name__icontains=q)
    albums = Album.objects.filter(name__icontains=q)

    for s in songs:
        results.append({'type': 'Song', 'name': s.name,'cover_image_url': s.cover_image_url, 'id': s.id})
    for a in artists:
        results.append({'type': 'Artist', 'name': a.name,'avata': a.avatar, 'id': a.id})
    for al in albums:
        results.append({'type': 'Album', 'name': al.name,'cover_image':al.cover_image, 'id': al.id})

    return JsonResponse(results, safe=False)
