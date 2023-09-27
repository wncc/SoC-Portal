from django.db import models


class CustomUser(models.Model):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    # Add custom fields here, if needed

    def __str__(self):
        return self.username