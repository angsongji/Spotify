from django.db import models
from .playlist_models import Playlist
from .song_models import Song

class Playlist_Song(models.Model):
    playlist_id = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    song_id = models.ForeignKey(Song, on_delete= models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Playlist: {self.playlist_id}, Song: {self.song_id}"