from rest_framework import generics

from .models import Project
from .serializers import ProjectSerializer, BasicProjectSerializer

from projects.models import Season
from rest_framework import generics, views

from .models import Mentee
# from .serializers import (
#     ProjectAdditionSerializer,
# )


class ProjectListView(generics.ListAPIView):
    permission_classes = []
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class BasicProjectListView(generics.ListAPIView):
    permission_classes = []
    queryset = Project.objects.all()
    serializer_class = BasicProjectSerializer


# class ProjectAddView(generics.CreateAPIView):
#     queryset = Project.objects.all()
#     serializer_class = ProjectAdditionSerializer

#     def get_serializer_context(self):
#         context = super().get_serializer_context()
#         context["request"] = self.request
#         return context
