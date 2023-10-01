from django.db import models


class Project(models.Model):
    class CategoryChoices(models.TextChoices):
        BLOCKCHAIN = "WEB3", "Blockchain"
        MISCELLANEOUS = "MISC", "Miscellaneous"

    title = models.CharField(max_length=255, blank=False)
    project_category = models.CharField(max_length=4)
    mentee_limit = models.IntegerField()

    description = models.TextField()
