from django.shortcuts import render, redirect
from rest_framework import generics
from .models import Project
from .serializers import ProjectSubmissionSerializer, MenteeSerializer


class ProjectSubmitView(generics.CreateAPIView):
    serializer_class = ProjectSubmissionSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context


class MenteeView(generics.CreateAPIView):
    serializer_class = MenteeSerializer

    def mentee_view(request):
        if request.method == "POST":
            # Check if the form is submitted
            form = MenteeSerializer(request.POST)
            if form.is_valid():
                # Save the form data to the database
                form.save()
                # Redirect to a success page or another URL
                return redirect("success_page")
        else:
            form = MenteeSerializer()

        return render(request)
