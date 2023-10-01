from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import User
from .forms import UserChangeForm, UserCreationForm


class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserChangeForm
    add_form = UserCreationForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
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
