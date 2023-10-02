# myapp/serializers.py
from rest_framework import serializers
from .models import Project, ProjectSubmission
from accounts.models import User


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class ProjectSubmissionSerializer(serializers.ModelSerializer):
    project = ProjectSerializer()

    def create(self, validated_data):
        project_data = validated_data.pop("project")
        project = Project.objects.create(**project_data)
        submission = ProjectSubmission.objects.create(project=project, **validated_data)

        return submission

    class Meta:
        model = ProjectSubmission
        fields = "__all__"
