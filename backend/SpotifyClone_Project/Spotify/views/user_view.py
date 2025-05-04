from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models.user_models import User
from ..models.role_models import Role
from ..serializers.user_serializer import UserSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def get_user_by_account(request, account_id):
    user = get_object_or_404(User, account__id=account_id)
    serializer = UserSerializer(user)
    return Response(serializer.data)

class UserListView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
class UpdateUserRoleView(APIView):
    def post(self, request, user_id):
        role_name = request.data.get('role')  # Ví dụ: "admin"
        role_map = {
            "admin": 1,
            "user": 2,
            "premium_user": 3,
            "artist": 4,
        }
        role_id = role_map.get(role_name)

        if not role_id:
            return Response({"error": "Invalid role"}, status=400)

        try:
            user = User.objects.get(id=user_id)
            role = Role.objects.get(id=role_id)
            user.role = role
            user.save()
            return Response({"message": "Role updated successfully"})
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
        except Role.DoesNotExist:
            return Response({"error": "Role not found"}, status=404)