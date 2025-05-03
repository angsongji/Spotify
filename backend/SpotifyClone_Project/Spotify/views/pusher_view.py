# views.py
import pusher
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models.message_models import Message
from ..models.user_models import User


pusher_client = pusher.Pusher(
    app_id=settings.PUSHER_APP_ID,
    key=settings.PUSHER_KEY,
    secret=settings.PUSHER_SECRET,
    cluster=settings.PUSHER_CLUSTER,
    ssl=True
)

class MessageAPIView(APIView):

    def post(self, request):
        pusher_client.trigger('chat', 'message', {
            'username': request.data['username'],
            'message': request.data['message'],
        })

        return Response([])