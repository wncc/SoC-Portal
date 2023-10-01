from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["roll_number", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate_password(self, password):
        """
        Validate the password against all password validators.
        """
        validate_password(password)
        return password

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
