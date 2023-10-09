# myapp/serializers.py
from projects.models import Project
from rest_framework import serializers

from .models import Mentee, MenteePreference


class ProjectAdditionSerializer(serializers.ModelSerializer):
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
        project.mentors.add(first_mentor, through_defaults={"is_accepted": True})

        if len(co_mentors):
            project.mentors.add(*co_mentors)

        return project

    class Meta:
        model = Project
        fields = "__all__"


class MenteePreferenceSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source="project.title")

    class Meta:
        model = MenteePreference
        exclude = ["id", "form"]
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
            preference["form"] = instance.id
            MenteePreference.objects.create(preference)

        instance.refresh_from_db()
        return instance

    class Meta:
        model = Mentee
        fields = "__all__"
        read_only_fields = ["mentee", "season"]
