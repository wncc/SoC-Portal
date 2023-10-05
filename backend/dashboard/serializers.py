# myapp/serializers.py
from rest_framework import serializers
from .models import Project, ProjectSubmission, MenteeForm


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"
        read_only_fields = ["season"]


class ProjectSubmissionSerializer(serializers.ModelSerializer):
    """
    Note: this serializer has a nested project.mentors field, but since this is
    read_only and co_mentors is write_only, this does not cause any issues.
    """

    project = ProjectSerializer()
    co_mentors = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=False
    )

    def create(self, validated_data):
        project_data = validated_data.pop("project")
        project = Project.objects.create(**project_data)

        first_mentor = self.context["request"].user
        project.mentors.add(first_mentor, through_defaults={"is_accepted": True})

        if validated_data.get("co_mentors", None) is not None:
            co_mentors = validated_data.pop("co_mentors")
            if len(co_mentors):
                project.mentors.add(*co_mentors)

        submission = ProjectSubmission.objects.create(project=project, **validated_data)
        return submission

    class Meta:
        model = ProjectSubmission
        fields = "__all__"


class MenteeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenteeForm
        fields = "__all__"
