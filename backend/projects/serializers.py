from rest_framework import serializers

from .models import Project, MenteePreference


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"
        read_only_fields = ["season"]


class BasicProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "title", "general_category", "banner_image"]

class MenteePreferenceSerializer(serializers.ModelSerializer):
    project = BasicProjectSerializer()

    class Meta:
        model = MenteePreference
        fields = "__all__"

class MenteePreferenceSaveSerializer(serializers.ModelSerializer):


    class Meta:
        model = MenteePreference
        fields = "__all__"


# class MentorRequestSerializer(serializers.ModelSerializer):
#     project = ProjectSerializer()

#     class Meta:
#         model = MentorRequest
#         exclude = ["mentor"]


# class ProjectAdditionSerializer(ProjectSerializer):
#     """
#     Note: this serializer has a nested project.mentors field, but since this is
#     read_only and co_mentors is write_only, this does not cause any issues.
#     """

#     class Meta:
#         model = Project
#         fields = "__all__"
#         read_only_fields = ["season", "mentors"]

#     # co_mentors = serializers.ListField(
#     #     child=serializers.IntegerField(), write_only=True, required=False
#     # )

#     def create(self, validated_data):
#         # co_mentors = validated_data.pop("co_mentors", [])
#         project = Project.objects.create(**validated_data)

#         first_mentor = self.context["request"].user
#         project.mentors.add(
#             first_mentor,
#             through_defaults={
#                 "status": MentorRequest.RequestStatusChoices.FIRST_MENTOR
#             },
#         )

#         # if len(co_mentors):
#         #     project.mentors.add(*co_mentors)

#         return project
