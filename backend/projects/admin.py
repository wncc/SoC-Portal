from django.contrib import admin

from .models import MentorRequest, Project, Season


class MentorInline(admin.TabularInline):
    model = MentorRequest
    max_num = 4
    extra = 1


class ProjectAdmin(admin.ModelAdmin):
    model = Project
    inlines = [MentorInline]


# Register your models here.
admin.site.register(Season)
admin.site.register(Project, ProjectAdmin)
