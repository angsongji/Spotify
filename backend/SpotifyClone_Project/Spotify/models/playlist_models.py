from django.db import models
from .user_models import User

class Playlist(models.Model):
    name = models.CharField(max_length=255, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)  
    is_public = models.BooleanField(null=True, default=False)  
    created_at = models.DateTimeField(auto_now_add=True)  
    updated_at = models.DateTimeField(auto_now=True)  

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created_at']  # Sắp xếp theo thời gian tạo, mới nhất lên đầu