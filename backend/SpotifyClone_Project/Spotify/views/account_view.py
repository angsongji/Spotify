# views/account_view.py
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password
from ..serializers.account_serializer import AccountLoginSerializer,AccountRegisterSerializer
from ..models.account_models import Account

class AccountLoginView(APIView):
    def post(self, request):
        serializer = AccountLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            try:
                account = Account.objects.get(email=email)
                if check_password(password, account.password):
                    refresh = RefreshToken.for_user(account)
                    return Response({
                         "refresh": str(refresh),
                        "access": str(refresh.access_token),
                        "email": account.email,
                        "id": account.id,
                        })
                else:
                    return Response({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)
            except Account.DoesNotExist:
                return Response({"error": "Account not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AccountRegisterView(APIView):
    def post(self, request):
        serializer = AccountRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Account created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)