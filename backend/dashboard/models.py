from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from accounts.models import User


def default_season_name():
    now = timezone.now()
    is_winter = now.month >= 10 or now.month <= 2
    "{}SOC {}".format("W" if is_winter else "", now.year)


class Season(models.Model):
    """
    Model representing a Seasons of Code event. Used by projects to
    reference which event they belonged to, and to control the apprearence of
    the dashboard as the event progresses.
    """

    name = models.CharField(max_length=100, default=default_season_name)
    is_active = models.BooleanField(default=False)


class Project(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255, blank=False)
    season = models.ForeignKey(
        Season, on_delete=models.PROTECT, related_name="projects"
    )
    mentors = models.ManyToManyField(User, through="MentorRequest")

    class CategoryChoices(models.TextChoices):
        BLOCKCHAIN = "WEB3", "Blockchain"
        AI_ML = "AIML", "AI/ML"
        DEVELOPMENT = "DEV", "Development"
        CP = "CP", "Competitive Programming"
        MISCELLANEOUS = "MISC", "Miscellaneous"

    category = models.CharField(max_length=4, choices=CategoryChoices.choices)

    mentee_min = models.IntegerField(
        default=1, validators=[MinValueValidator(1), MaxValueValidator(20)]
    )
    mentee_max = models.IntegerField(
        required=True, validators=[MinValueValidator(1), MaxValueValidator(20)]
    )

    abstract = models.TextField(max_length=500)
    description = models.TextField()
    # Need some representation for timeline


class MentorRequest(models.Model):
    """
    Explicit many-to-many linking table between Project and
    User. Doubles as the (co-)mentor request table
    """

    mentor = models.ForeignKey(User, on_delete=models.SET_NULL)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    is_accepted = models.BooleanField(default=False)


class ProjectSubmission(models.Model):
    """
    Contains a reference to a project, along with details of
    a project only relevant during mentor/project registration.
    """

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    sop = models.TextField()  # Should decide between storing text vs Google Doc link
