import uuid

from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils import timezone

from accounts.models import UserProfile


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
        MENTOR_REGISTRATION = 10
        MID_MENTOR_MENTEE = 15
        MENTEE_REGISTRATION = 20
        ONGOING = 30

    status = models.IntegerField(
        default=StatusChoices.YET_TO_START, choices=StatusChoices.choices
    )

    def __str__(self):
        return self.name


def get_current_id():
    return Season.objects.current_id()


def upload_to(instance, filename):
    return "projects/{filename}".format(filename=filename)


class Mentor(models.Model):
    """
    A Mentor is the representation of a user in a season creating/heading projects.
    """

    user = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        help_text="The user corresponding to the mentee.",
    )
    season = models.ForeignKey(
        Season,
        on_delete=models.PROTECT,
        default=get_current_id,
        help_text="The season to which mentee is applying for.",
    )

    def __str__(self):
        return self.user.roll_number

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "season"],
                name="mentor_unique_user_season",
            )
        ]


class Mentee(models.Model):
    """
    A Mentee is the representation of a user in a season applying to projects.
    """

    user = models.ForeignKey(
        UserProfile,
        on_delete=models.CASCADE,
        help_text="The user corresponding to the mentee.",
    )
    season = models.ForeignKey(
        Season,
        on_delete=models.PROTECT,
        default=get_current_id,
        help_text="The season to which mentee is applying for.",
    )

    # project = models.ForeignKey(
    #     Project,
    #     null=True,
    #     on_delete=models.SET_NULL,
    #     help_text="The project that the mentee has been selected for. Is NULL if not selected yet.",
    # )

    preferences = models.ManyToManyField(
        "Project",
        through="MenteePreference",
        related_name="applications",
        help_text="The projects that the mentee has applied to.",
    )

    def __str__(self):
        return self.user.roll_number

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "season"],
                name="mentee_unique_user_season",
            )
        ]


class ProjectCategory(models.Model):
    name = models.CharField(max_length=255, blank=False)
    description = models.TextField()

    def __str__(self):
        return self.name


class Project(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255, blank=False)
    season = models.ForeignKey(
        Season,
        on_delete=models.PROTECT,
        related_name="projects",
        default=get_current_id,
    )

    mentors = models.ManyToManyField(Mentor, through="MentorRequest")

    # class CategoryChoices(models.TextChoices):
    #     BLOCKCHAIN = "WEB3", "Blockchain"
    #     AI_ML = "AIML", "AI/ML"
    #     DEVELOPMENT = "DEV", "Development"
    #     CP = "CP", "Competitive Programming"
    #     MISCELLANEOUS = "MISC", "Miscellaneous"

    category = models.ForeignKey(ProjectCategory, on_delete=models.PROTECT)

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

    code = models.CharField(max_length=8, editable=False, unique=True)
    is_accepted = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.code:
            # Generate a UUID and take the first 8 characters
            self.code = str(uuid.uuid4())[:8]
        super().save(*args, **kwargs)


class MentorRequest(models.Model):
    """
    Explicit many-to-many linking table between Project and
    Mentor. Doubles as the (co-)mentor request table
    """

    mentor = models.ForeignKey(Mentor, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    class RequestStatusChoices(models.IntegerChoices):
        PENDING = 0b00
        FIRST_MENTOR = 0b01
        REJECTED = 0b10
        ACCEPTED = 0b11

    status = models.IntegerField(
        choices=RequestStatusChoices.choices, default=RequestStatusChoices.PENDING
    )


class MenteePreference(models.Model):
    """
    Preferences of a mentee (ie a user during a specific season)
    """

    mentee = models.ForeignKey(Mentee, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    sop = models.TextField()
    ordering = models.IntegerField()
