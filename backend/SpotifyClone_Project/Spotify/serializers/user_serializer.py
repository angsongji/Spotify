from rest_framework import serializers
from ..models.user_models import User

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='account.email', read_only=True)
    create_at = serializers.DateTimeField(source='account.create_at', read_only=True)

    class Meta:
        model = User
        fields = '__all__'  
        extra_fields = ['email','create_at']

    def to_representation(self, instance):
        """Thêm các field bổ sung vào output"""
        ret = super().to_representation(instance)
        ret['email'] = instance.account.email  
        ret['create_at'] = instance.account.create_at
        return ret
