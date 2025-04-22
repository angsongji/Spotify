from rest_framework.views import APIView
from Spotify.models.video_models import Video
from rest_framework.response import Response
from Spotify.serializers.video_serializer import VideoSerializer
from rest_framework import status

class VideoListAPIView(APIView):
     def get(self, request):
        videos = Video.objects.all()
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data)