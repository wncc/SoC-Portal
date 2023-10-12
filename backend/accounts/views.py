import re

from django.db.models import Value as V
from django.db.models.functions import Concat
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated as isAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

from backend.settings import SIMPLE_JWT

from .models import User
from .serializers import RegisterUserSerializer, UserAutoCompleteSerializer


class RegisterUserView(generics.CreateAPIView):
    """
    CreateAPIView that handles user registration
    """

    permission_classes = []
    serializer_class = RegisterUserSerializer


class UserListView(generics.ListAPIView):
    """
    ListAPIView to access user data, for user searching
    """

    serializer_class = UserAutoCompleteSerializer

    def get_queryset(self):
        queryset = User.objects.all()
        query = self.request.query_params.get("search")

        if query is not None and query != "":
            if re.search(r"\d", query):
                queryset = queryset.filter(roll_number__iexact=query)
            else:
                queryset = queryset.annotate(
                    full_name=Concat("first_name", V(" "), "last_name")
                )
                for term in query.split():
                    queryset = queryset.filter(full_name__icontains=term)

        return queryset[:10]


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if "access" in response.data:
            access_token = response.data["access"]
            response.set_cookie(
                key=SIMPLE_JWT["AUTH_COOKIE"], value=access_token, httponly=True
            )
        return response
