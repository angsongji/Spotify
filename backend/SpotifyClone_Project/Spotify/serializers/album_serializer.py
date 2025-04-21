from rest_framework import serializers
from ..models.album_models import Album

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = '__all__' 