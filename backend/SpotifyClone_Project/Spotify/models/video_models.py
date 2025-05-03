from django.db import models
from .artist_models import Artist
from .album_models import Album

class Video(models.Model):
    name = models.CharField(max_length=255)
    release_date = models.DateField(null=True, blank=True)
    artist = models.ForeignKey(Artist, null=True, blank=True, on_delete=models.SET_NULL)
    cover_image = models.URLField(max_length=500, null=True, blank=True)  
    duration = models.IntegerField(null=True, blank=True)
    views = models.IntegerField(default=0)
    album = models.ForeignKey(Album, null=True, blank=True, on_delete=models.SET_NULL)
    premium = models.BooleanField(default=False)
    video_file_url= models.URLField(max_length=500, null=True, blank=True)
    is_approved = models.BooleanField(default=False)

    def __str__(self):
        return self.name
