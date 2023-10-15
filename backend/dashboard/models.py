from accounts.models import User
from django.db import models
from projects.models import Project, Season, get_current_id


class Mentee(models.Model):
    """
    A Mentee is the representation of a user in a season applying to projects.
    """

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        help_text="The user corresponding to the mentee.",
    )
    season = models.ForeignKey(
        Season,
        on_delete=models.PROTECT,
        default=get_current_id,
        help_text="The season to which mentee is applying for.",
    )

    project = models.ForeignKey(
        Project,
        null=True,
        on_delete=models.SET_NULL,
        help_text="The project that the mentee has been selected for. Is NULL if not selected yet.",
    )

    preferences = models.ManyToManyField(
        Project,
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
                name="unique_user_season",
            )
        ]


class MenteePreference(models.Model):
    """
    Preferences of a mentee (ie a user during a specific season)
    """

    mentee = models.ForeignKey(Mentee, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    sop = models.TextField()
    ordering = models.IntegerField()
