from django.db import models
from .artist_models import Artist

class Album(models.Model):
    name = models.CharField(max_length=50)
    create_at = models.DateTimeField(auto_now_add=True)
    cover_image = models.CharField(max_length=255)
    artist_id = models.ForeignKey(Artist, on_delete=models.CASCADE)

    def __str__ (self):
        return self.name
    
    class Meta:
        ordering = ['-create_at']