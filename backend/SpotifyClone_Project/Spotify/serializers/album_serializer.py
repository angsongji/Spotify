from rest_framework import serializers
from ..models.album_models import Album
from ..models.song_models import Song  # đảm bảo bạn import đúng model Song

class AlbumSerializer(serializers.ModelSerializer):
    artist_name = serializers.CharField(source='artist_id.name', read_only=True)
    song_count = serializers.SerializerMethodField()

    class Meta:
        model = Album
        fields = ['id', 'name', 'create_at', 'cover_image', 'artist_id', 'is_approved', 'artist_name', 'song_count']

    def get_song_count(self, obj):
        return Song.objects.filter(album_id=obj.id).count()
