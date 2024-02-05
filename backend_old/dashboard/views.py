from projects.models import MentorRequest, Season
from rest_framework import generics, views

from .models import Mentee
from .serializers import (
    MenteeSerializer,
    MentorRequestSerializer,
    ProjectAdditionSerializer,
)


class DashboardView(generics.ListAPIView):
    def get_queryset(self):
        current_season = Season.objects.current()
        status = current_season.status
        if status == Season.StatusChoices.MENTOR_REGISTRATION:
            return MentorRequest.objects.filter(mentor=self.request.user)

    def get_serializer_class(self):
        current_season = Season.objects.current()
        status = current_season.status
        if status == Season.StatusChoices.MENTOR_REGISTRATION:
            return MentorRequestSerializer


class ProjectSubmitView(generics.CreateAPIView):
    serializer_class = ProjectAdditionSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context


class MenteeView(generics.RetrieveUpdateAPIView):
    serializer_class = MenteeSerializer

    def get_object(self):
        """
        This view should only return the form
        of the currently authenticated user.
        """
        user = self.request.user
        form = Mentee.objects.get_or_create(user=user, season=Season.objects.current())

        return form[0]
