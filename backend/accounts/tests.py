from io import BytesIO

from django.urls import reverse
from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.test import APITestCase
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from .models import User

username_field = User.USERNAME_FIELD


class TokenTest(APITestCase):
    authenticator = JWTAuthentication()
    token_obtain_pair_url = reverse("accounts:token_obtain_pair")
    test_user_data = {username_field: "student123", "password": "strongpassword#bday"}
    wrong_user_data = {username_field: "student123", "password": "wrongpassword"}

    def test_obtain_token_pair_valid_credentials(self):
        """
        Ensure that a token pair is generated for an existing user.
        """

        user = User.objects.create_user(**self.test_user_data)
        response = self.client.post(
            self.token_obtain_pair_url, self.test_user_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        stream = BytesIO(response.content)
        data = JSONParser().parse(stream)
        access_token = AccessToken(token=data["access"])
        refresh_token = RefreshToken(token=data["refresh"])
        self.assertEqual(user, self.authenticator.get_user(access_token))
        self.assertEqual(user, self.authenticator.get_user(refresh_token))

    def test_obtain_token_pair_invalid_no_user(self):
        """
        Ensure that a token pair is NOT generated for a non-existent user.
        """

        response = self.client.post(
            self.token_obtain_pair_url, self.test_user_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_obtain_token_pair_invalid_password(self):
        """
        Ensure that a token pair is NOT generated for an existing user with invalid credentials.
        """

        User.objects.create_user(**self.test_user_data)
        response = self.client.post(
            self.token_obtain_pair_url, self.wrong_user_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
