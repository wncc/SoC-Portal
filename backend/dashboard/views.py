from projects.models import Season
from rest_framework import generics, settings

from .models import Mentee
from .permissions import IsOwnerOrReadOnly
from .serializers import MenteeSerializer, ProjectSubmissionSerializer


class ProjectSubmitView(generics.CreateAPIView):
    serializer_class = ProjectSubmissionSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context


class MenteeView(generics.RetrieveUpdateAPIView):
    serializer_class = MenteeSerializer
    permission_classes = [
        *settings.api_settings.DEFAULT_PERMISSION_CLASSES,
        IsOwnerOrReadOnly,
    ]

    def get_object(self):
        """
        This view should only return the form
        of the currently authenticated user.
        """
        user = self.request.user
        form = Mentee.objects.get_or_create(user=user, season=Season.objects.current())

        return form[0]
