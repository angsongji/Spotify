from rest_framework import serializers
from Spotify.models.song_models import Song

class SongSerializer(serializers.ModelSerializer):
    artist_name = serializers.CharField(source='artist_id.name', read_only=True)
    album_name = serializers.CharField(source='album_id.name', read_only=True)
    artist_avatar_url = serializers.CharField(source='artist_id.avatar', read_only=True)

    class Meta:
        model = Song
        fields = '__all__'