from rest_framework.views import APIView
from Spotify.models.video_models import Video
from rest_framework.response import Response
from Spotify.serializers.video_serializer import VideoSerializer
from rest_framework import status

class VideoListAPIView(APIView):
    def get(self, request):
        # Chỉ lấy video đã được kiểm duyệt
        videos = Video.objects.filter(is_approved=True)
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data)
     
class VideoDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            video = Video.objects.get(pk=pk)
            serializer = VideoSerializer(video)
            return Response(serializer.data)
        except Video.DoesNotExist:
            return Response({'error': 'Video not found'}, status=status.HTTP_404_NOT_FOUND)
     