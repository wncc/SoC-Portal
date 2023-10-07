from django.contrib import admin
from .models import MenteeForm, MenteePreference, ProjectSubmission

# Register your models here.
admin.site.register(MenteeForm)
admin.site.register(MenteePreference)
admin.site.register(ProjectSubmission)
