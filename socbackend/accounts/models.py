from django.db import models
from django.contrib.auth.models import User
from .options import DepartmentChoices, YearChoices

def upload_to_location(instance, filename):
    return "profile_pictures/{filename}".format(filename=filename)






# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    name = models.CharField(max_length=100, blank=True, default="")
    profile_picture = models.ImageField(
        upload_to=upload_to_location, blank=True, default=""
    )
    phone_number = models.CharField(max_length=15, blank=False, null=False)
    roll_number = models.CharField(
        "roll number",
        max_length=20,
        unique=True,
        help_text="Required. 20 characters or fewer.",
        error_messages={
            "unique": "A user with that roll number already exists.",
        },
    )
    year = models.CharField(choices=YearChoices.choices, null=False, blank=False, max_length=100)
    department = models.CharField(
        max_length=50, choices=DepartmentChoices.choices, blank=False, null=False
    )

    verified = models.BooleanField(default=False)

    verification_token = models.CharField(max_length=32, blank=True, default="")



    
    # Add more fields as required

    def __str__(self):
        return f"{self.roll_number} - {self.user.username}"
