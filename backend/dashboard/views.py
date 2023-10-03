from django.shortcuts import render
from rest_framework import generics
from .models import Project
from .serializers import ProjectSubmissionSerializer


class ProjectSubmitView(generics.CreateAPIView):
    serializer_class = ProjectSubmissionSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context
