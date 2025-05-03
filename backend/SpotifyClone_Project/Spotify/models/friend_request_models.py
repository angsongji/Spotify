from django.db import models
from ..models.user_models import User

class FriendRequest(models.Model):
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friend_requests_sent')
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friend_requests_received')
    is_accepted = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('from_user', 'to_user')