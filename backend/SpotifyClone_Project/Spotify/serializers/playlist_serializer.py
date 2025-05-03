from rest_framework import serializers
from ..models import Playlist, Playlist_Song  # đảm bảo đã import Playlist_Song

class PlaylistSerializer(serializers.ModelSerializer):
    song_count = serializers.SerializerMethodField()

    class Meta:
        model = Playlist
        fields = '__all__'  

    def get_song_count(self, obj):
        return Playlist_Song.objects.filter(playlist_id=obj.id).count()
    
class PlaylistSongSerializer(serializers.ModelSerializer):
    playlist = serializers.PrimaryKeyRelatedField(source='playlist_id', read_only=True)
    song = serializers.PrimaryKeyRelatedField(source='song_id', read_only=True)

    class Meta:
        model = Playlist_Song
        fields = ['id', 'playlist', 'song', 'added_at']