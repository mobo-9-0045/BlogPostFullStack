from django.contrib.auth.models import User;
from rest_framework import serializers

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True);
    password2 = serializers.CharField(write_only=True, required=True);
    
    class Meta:
        model = User;
        fields = ['username', 'email', 'password', 'password2'];
        extra_kwargs = {
            'email': {'required': True}
        }
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'passowrd': "Password filed didn't match"});
        return attrs;

    def create(self, valildated_data):
        valildated_data.pop('password2');
        user = User.objects.create_user(**valildated_data);
        return user;
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User;
        fields = ['id', 'username', 'email'];
        read_onlny_fields = ['id'];