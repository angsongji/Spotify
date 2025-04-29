from rest_framework import serializers
from Spotify.models.video_models import Video

class VideoSerializer(serializers.ModelSerializer):
    artist_name = serializers.CharField(source='artist_id.name', read_only=True)

    class Meta:
        model = Video
        fields = '__all__'