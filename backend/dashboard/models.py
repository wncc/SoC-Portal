
from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=1000)
    project_category = models.CharField(max_length=10000000)
    description = models.CharField(max_length=1000000000)
    mentee_limit=models.IntegerField()

