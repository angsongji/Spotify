from django.db import models
from .artist_models import Artist
from .music_genres_models import MusicGenres
from .album_models import Album

class Song (models.Model):
    name = models.CharField(max_length=50)
    release_date= models.DateField()
    artist_id = models.ForeignKey(Artist,on_delete=models.CASCADE)
    music_genre_id = models.ForeignKey(MusicGenres,on_delete=models.CASCADE)
    cover_image = models.ImageField(upload_to='covers/', null=True, blank=True)
    duration = models.IntegerField()
    plays = models.IntegerField(default=0)
    album_id = models.ForeignKey(Album,on_delete=models.CASCADE)
    premium = models.BooleanField()
    audio_file = models.FileField(upload_to='songs/', null=True, blank=True)

    def __str__(self):
        return self.name

