# myapp/serializers.py
from accounts.models import User
from projects.models import MentorRequest, Project, Season
from projects.serializers import ProjectSerializer
from rest_framework import serializers

from .models import Mentee, MenteePreference


class MentorRequestSerializer(serializers.ModelSerializer):
    project = ProjectSerializer()

    class Meta:
        model = MentorRequest
        exclude = ["mentor"]


class ProjectAdditionSerializer(ProjectSerializer):
    """
    Note: this serializer has a nested project.mentors field, but since this is
    read_only and co_mentors is write_only, this does not cause any issues.
    """

    co_mentors = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=False
    )

    def create(self, validated_data):
        co_mentors = validated_data.pop("co_mentors", [])
        project = Project.objects.create(**validated_data)

        first_mentor = self.context["request"].user
        project.mentors.add(
            first_mentor,
            through_defaults={
                "status": MentorRequest.RequestStatusChoices.FIRST_MENTOR
            },
        )

        if len(co_mentors):
            project.mentors.add(*co_mentors)

        return project


class MenteePreferenceSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source="project.title")

    class Meta:
        model = MenteePreference
        exclude = ["mentee"]
        read_only_fields = ["title"]


class MenteeSerializer(serializers.ModelSerializer):
    preferences = MenteePreferenceSerializer(many=True, max_length=3, required=True)

    def update(self, instance, validated_data):
        # Extract preferences from validated data
        preferences = validated_data.pop("preferences", [])

        instance.preferences.set([])
        instance.save()

        # For each preference, populate the value of the form ID, and add to db
        for preference in preferences:
            preference["mentee"] = instance.id
            MenteePreference.objects.create(preference)

        instance.refresh_from_db()
        return instance

    class Meta:
        model = Mentee
        exclude = ["project"]
        read_only_fields = ["mentee", "season"]
