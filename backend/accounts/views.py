import re

from django.db.models import Value as V
from django.db.models.functions import Concat
from rest_framework import generics

from .models import User
from .serializers import RegisterUserSerializer, UserAutoCompleteSerializer


class RegisterUserView(generics.CreateAPIView):
    permission_classes = []
    serializer_class = RegisterUserSerializer


class UserListView(generics.ListAPIView):
    serializer_class = UserAutoCompleteSerializer

    def get_queryset(self):
        queryset = User.objects.all()
        query = self.request.query_params.get("search")

        if query is not None and query != "":
            if re.search(r"\d", query):
                queryset = queryset.filter(roll_number__istarts_with=query)
            else:
                queryset = queryset.annotate(
                    full_name=Concat("first_name", V(" "), "last_name")
                )
                for term in query.split():
                    queryset = queryset.filter(full_name__icontains=term)

        return queryset[:10]
