from accounts.models import User
from django.db import models
from projects.models import Project, Season, get_current_id


class ProjectSubmission(models.Model):
    """
    Contains a reference to a project, along with details of
    a project only relevant during mentor/project registration.
    """

    project = models.OneToOneField(Project, on_delete=models.CASCADE)
    sop = models.TextField()  # Should decide between storing text vs Google Doc link


class MenteeForm(models.Model):
    """
    Allows mentee to choose their preference
    """

    mentee = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="application"
    )
    season = models.ForeignKey(
        Season,
        on_delete=models.PROTECT,
        default=get_current_id,
    )

    preferences = models.ManyToManyField(Project, through="MenteePreference")


class MenteePreference(models.Model):
    """
    Preferences of a mentee (ie a user during a specific season)
    """

    form = models.ForeignKey(MenteeForm, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    sop = models.TextField()
    ordering = models.IntegerField()
