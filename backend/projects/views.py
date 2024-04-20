from rest_framework import generics

from .models import Project
from .serializers import ProjectSerializer, BasicProjectSerializer, MenteePreferenceSerializer, MenteePreferenceSaveSerializer

from projects.models import Season
from rest_framework import generics, views
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Mentee, Project, MenteePreference, MenteeWishlist
from rest_framework.permissions import IsAuthenticated
from accounts.models import UserProfile
# from .serializers import (
#     ProjectAdditionSerializer,
# )

class ProjectDetailView(APIView):
    permission_classes = []
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get(self, request, pk):
        project = Project.objects.get(pk=pk)
        serializer = self.serializer_class(project)
        return Response(serializer.data)
    

class ProjectWishlist(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_profile = UserProfile.objects.get(user=request.user)
        mentee = Mentee.objects.get(user=user_profile)
        preferences = MenteeWishlist.objects.filter(mentee=mentee)
        project_objects = [preference.project for preference in preferences]
        serializer = BasicProjectSerializer(project_objects, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        user_profile = UserProfile.objects.get(user=request.user)
        mentee = Mentee.objects.get(user=user_profile)
        project_id = request.data["project_id"]
        project = Project.objects.get(pk=project_id)
        preference = MenteeWishlist(mentee=mentee, project=project)
        preference.save()
        return Response({"message": "Project added to wishlist."})
    
    def delete(self, request):
        user_profile = UserProfile.objects.get(user=request.user)
        mentee = Mentee.objects.get(user=user_profile)
        project_id = request.GET['project_id']
        project = Project.objects.get(pk=project_id)
        preference = MenteeWishlist.objects.get(mentee=mentee, project=project)
        preference.delete()
        return Response({"message": "Project removed from wishlist."})
    
class ProjectPreference(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_profile = UserProfile.objects.get(user=request.user)
        mentee = Mentee.objects.get(user=user_profile)
        preferences = MenteePreference.objects.filter(mentee=mentee)
        serializer = MenteePreferenceSerializer(preferences, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        user_profile = UserProfile.objects.get(user=request.user)
        mentee = Mentee.objects.get(user=user_profile)
        project_id = request.data["project"]
        preference = request.data["preference"]
        sop = request.data["sop"]
        project = Project.objects.get(pk=project_id)
        serializer = MenteePreferenceSaveSerializer(data={"mentee": mentee.id, "project": project.id, "preference": preference, "sop": sop})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def delete(self, request):
        user_profile = UserProfile.objects.get(user=request.user)
        mentee = Mentee.objects.get(user=user_profile)
        project_id = request.data["project_id"]
        project = Project.objects.get(pk=project_id)
        preference = MenteePreference.objects.get(mentee=mentee, project=project)
        preference.delete()
        return Response({"message": "Project removed from preferences."})

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
