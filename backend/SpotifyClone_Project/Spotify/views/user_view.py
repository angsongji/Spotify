from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models.user_models import User
from ..serializers.user_serializer import UserSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def get_user_by_account(request, account_id):
    user = get_object_or_404(User, account__id=account_id)
    serializer = UserSerializer(user)
    return Response(serializer.data)
