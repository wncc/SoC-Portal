import re

from django.db.models import Value as V
from django.db.models.functions import Concat
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import APIException

from backend.settings import SIMPLE_JWT

from .helpers import fetch_from_sso
from .models import UserProfile
from .serializers import RegisterUserSerializer, UserAutoCompleteSerializer


class RegisterUserView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterUserSerializer


class UserAutoCompleteView(ListAPIView):
    """
    ListAPIView to access user data, for user searching
    """

    serializer_class = UserAutoCompleteSerializer

    def get_queryset(self):
        queryset = UserProfile.objects.all()
        query = self.request.query_params.get("search")

        if query is not None and query != "":
            if re.search(r"\d", query):
                queryset = queryset.filter(user__roll_number__iexact=query)
            else:
                queryset = queryset.annotate(
                    full_name=Concat("user__first_name", V(" "), "user__last_name")
                )
                for term in query.split():
                    queryset = queryset.filter(full_name__icontains=term)

        return queryset[:10]


class CreateUserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            data = fetch_from_sso(
                request.data["code"], "http://localhost:3000/register", request
            )
        except APIException as e:
            return Response(e.detail, status=e.status_code)

        return Response(data)


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if "access" in response.data:
            access_token = response.data["access"]
            response.set_cookie(
                key=SIMPLE_JWT["AUTH_COOKIE"], value=access_token, httponly=True
            )
        return response
