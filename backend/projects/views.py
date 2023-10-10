from rest_framework import generics

from .models import Project
from .serializers import ProjectSerializer


class ProjectListView(generics.ListAPIView):
    permission_classes = []
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
