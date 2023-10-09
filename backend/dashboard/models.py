from accounts.models import User
from django.db import models
from projects.models import Project, Season, get_current_id


class Mentee(models.Model):
    """
    Allows mentee to choose their preference
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    season = models.ForeignKey(
        Season,
        on_delete=models.PROTECT,
        default=get_current_id,
    )

    preferences = models.ManyToManyField(Project, through="MenteePreference")

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

    form = models.ForeignKey(Mentee, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    sop = models.TextField()
    ordering = models.IntegerField()
