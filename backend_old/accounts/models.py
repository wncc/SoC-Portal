from django.apps import apps
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import PermissionsMixin, User
from django.core.mail import send_mail
from django.db import models
from django.utils import timezone


class User(models.Model):
    """
    An extension of

    roll_number and password are required. Other fields are optional.
    """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    roll_number = models.CharField(
        "roll number",
        max_length=20,
        unique=True,
        help_text="Required. 20 characters or fewer.",
        error_messages={
            "unique": "A user with that roll number already exists.",
        },
    )

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def get_full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        full_name = "%s %s" % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        """Return the short name for the user."""
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)
