from django.contrib import admin

from .models import Project, Season

# Register your models here.
admin.site.register(Season)
admin.site.register(Project)
