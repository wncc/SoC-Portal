from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from .models import User

username_field = User.USERNAME_FIELD


def get_user_data(usr="22b1231", pwd="testpass123"):
    return {username_field: usr, "password": pwd}


def get_full_user_data(
    usr="22b1231",
    pwd="testpass123",
    email="email@email.com",
    fn="Test",
    ln="User",
):
    return {
        username_field: usr,
        "password": pwd,
        "email": email,
        "first_name": fn,
        "last_name": ln,
    }


class RegistrationTest(APITestCase):
    test_data = get_user_data()
    weak_pass_test_data = get_user_data(pwd="password")
    num_pass_test_data = get_user_data(pwd="23571113")
    registration_url = reverse("accounts:register_user")

    def test_successful_registration(self):
        """
        Ensure that a user is successfully created.
        """
        request_data = self.test_data
        response = self.client.post(self.registration_url, request_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        data = response.data
        self.assertEqual(request_data[username_field], data[username_field])

    def test_weak_password_common(self):
        """
        Ensure that a user is NOT created when a common password is used.
        """
        request_data = self.weak_pass_test_data
        response = self.client.post(self.registration_url, request_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        data = response.data
        self.assertEqual(data["password"], ["This password is too common."])

    def test_weak_password_numeric(self):
        """
        Ensure that a user is NOT created when a password of only numbers is used.
        """
        request_data = self.num_pass_test_data
        response = self.client.post(self.registration_url, request_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        data = response.data
        self.assertEqual(data["password"], ["This password is entirely numeric."])


class TokenTest(APITestCase):
    authenticator = JWTAuthentication()
    token_obtain_pair_url = reverse("accounts:token_obtain_pair")
    test_user_data = get_user_data()
    wrong_user_data = get_user_data(pwd="wrongpassword")

    def test_obtain_token_pair_valid_credentials(self):
        """
        Ensure that a token pair is generated for an existing user.
        """

        user = User.objects.create_user(**self.test_user_data)
        response = self.client.post(
            self.token_obtain_pair_url, self.test_user_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        data = response.data
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
