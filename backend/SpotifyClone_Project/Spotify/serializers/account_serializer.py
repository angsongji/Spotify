from rest_framework import serializers
from ..models.account_models import Account
from django.contrib.auth.hashers import make_password

class AccountLoginSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

class AccountRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['email', 'password']

    def create(self, validated_data):
        # Hash password trước khi lưu
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)