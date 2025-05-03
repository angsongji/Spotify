from rest_framework import serializers
from ..models.music_genres_models import MusicGenres

class MusicGenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = MusicGenres
        fields = ['id', 'name','description']