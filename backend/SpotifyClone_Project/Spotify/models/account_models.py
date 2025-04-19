from django.db import models
from django.contrib.auth.models import AbstractBaseUser

class Account(models.Model):
    email = models.EmailField(max_length=100, null=False)
    password = models.CharField(max_length=255) 
    create_at = models.DateTimeField(auto_now_add=True)  # Tự động thêm thời gian tạo
    is_active = models.BooleanField(default=False)  
    verification_token = models.CharField(max_length=64, blank=True, null=True)
    is_online = models.BooleanField(default=False)

    def __str__(self):
        return self.email

    class Meta:
        ordering = ['-create_at']  # Sắp xếp theo thời gian tạo, mới nhất lên đầu