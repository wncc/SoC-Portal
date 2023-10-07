from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .forms import UserChangeForm, UserCreationForm
from .models import User


class UserAdmin(BaseUserAdmin):
    """
    ModelAdmin for accounts.User. Inherits from the ModelAdmin for auth.User,
    with some values over-riden to account for the differences in both models.
    """

    form = UserChangeForm
    add_form = UserCreationForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User (username)
    list_display = ["roll_number", "email", "is_active", "is_staff"]
    list_filter = ["is_active", "is_staff"]
    fieldsets = [
        (None, {"fields": ["roll_number", "password"]}),
        ("Personal info", {"fields": ["first_name", "last_name", "email"]}),
        (
            "Permissions",
            {
                "fields": [
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ],
            },
        ),
    ]
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["roll_number", "email", "password1", "password2"],
            },
        ),
    ]
    search_fields = ["roll_number"]
    ordering = ["roll_number"]
    filter_horizontal = ["user_permissions", "groups"]


# Now register the new UserAdmin...
admin.site.register(User, UserAdmin)
