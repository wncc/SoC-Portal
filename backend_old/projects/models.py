from accounts.models import User
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils import timezone


def default_season_name():
    now = timezone.now()
    is_winter = now.month >= 10 or now.month <= 2
    return "{}SOC {}".format("W" if is_winter else "", now.year)


# Hard-coded value for the current active season, since we assume this doesn't change over a long period
CURRENT_ACTIVE_SEASON_ID = settings.PORTAL_SETTINGS["CURRENT_ACTIVE_SEASON_ID"]


class SeasonManager(models.Manager):
    def current(self, hard_coded=True):
        """
        Method to get the currently active Season. Has a hacky implementation using the
        hard-coded Season ID, which can be overriden by setting hard_coded to False
        """
        if hard_coded:
            return self.get(id=CURRENT_ACTIVE_SEASON_ID)
        return self.get(is_active=True)

    def current_id(self, hard_coded=True):
        """
        Method to get the currently active Season ID. Has a hacky implementation using the
        hard-coded Season ID, which can be overriden by setting hard_coded to False
        """
        if hard_coded:
            return CURRENT_ACTIVE_SEASON_ID
        return self.get(is_active=True).id


class Season(models.Model):
    """
    Model representing a Seasons of Code event. Used by projects to
    reference which event they belonged to, and to control the apprearence of
    the dashboard as the event progresses.
    """

    name = models.CharField(max_length=100, default=default_season_name)
    is_active = models.BooleanField(default=False)
    objects = SeasonManager()

    class StatusChoices(models.IntegerChoices):
        YET_TO_START = 0
        MENTOR_REGISTRATION = 2
        MENTEE_REGISTRATION = 4
        ONGOING = 6

    status = models.IntegerField(default=0, choices=StatusChoices.choices)

    def __str__(self):
        return self.name


def get_current_id():
    return Season.objects.current_id()


def upload_to(instance, filename):
    return "images/{filename}".format(filename=filename)


class Project(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255, blank=False)
    season = models.ForeignKey(
        Season,
        on_delete=models.PROTECT,
        related_name="projects",
        default=get_current_id,
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
        blank=False, validators=[MinValueValidator(1), MaxValueValidator(20)]
    )

    abstract = models.TextField(max_length=500)
    description = models.TextField()
    timeline = models.TextField()
    banner_image = models.ImageField(upload_to=upload_to, blank=True, null=True)
    is_accepted = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class MentorRequest(models.Model):
    """
    Explicit many-to-many linking table between Project and
    User. Doubles as the (co-)mentor request table
    """

    mentor = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    class RequestStatusChoices(models.IntegerChoices):
        PENDING = 0b00
        FIRST_MENTOR = 0b01
        REJECTED = 0b10
        ACCEPTED = 0b11

    status = models.IntegerField(
        choices=RequestStatusChoices.choices, default=RequestStatusChoices.PENDING
    )
