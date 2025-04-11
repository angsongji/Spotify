from django.db import models
from .account_models import Account

class Artist(models.Model):
    account_id = models.ForeignKey(Account, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    avatar = models.CharField(max_length=255)

    def __str__ (self):
        return f"Artist: {self.name}"