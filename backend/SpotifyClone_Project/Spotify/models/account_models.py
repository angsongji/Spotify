from django.db import models

class Account(models.Model):
    email = models.EmailField(max_length=100, null=False)
    password = models.CharField(max_length=255) 
    create_at = models.DateTimeField(auto_now_add=True)  # Tự động thêm thời gian tạo
    is_active = models.BooleanField(default=True)  

    def __str__(self):
        return self.email

    class Meta:
        ordering = ['-create_at']  # Sắp xếp theo thời gian tạo, mới nhất lên đầu