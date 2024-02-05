from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from .models import User


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["roll_number", "email", "password"]
        extra_kwargs = {
            "password": {"style": {"input_type": "password"}, "write_only": True}
        }

    def validate_password(self, password):
        """
        Validate the password against all password validators.
        """
        validate_password(password)

        return password

    def create(self, validated_data):
        """
        Override the create mehtod with objects.create_user,
        since the former saves with an unencrypted password
        """
        return User.objects.create_user(**validated_data)


class UserAutoCompleteSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="get_full_name")

    class Meta:
        model = User
        fields = ["id", "roll_number", "name"]
