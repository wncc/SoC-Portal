from django.contrib import admin

from .models import Project, Season, Mentee, MenteePreference


# class MentorInline(admin.TabularInline):
#     model = MentorRequest
#     max_num = 4
#     extra = 1


# class ProjectAdmin(admin.ModelAdmin):
#     model = Project
#     inlines = [MentorInline]


# Register your models here.
admin.site.register(Season)
# admin.site.register(Project, ProjectAdmin)
# admin.site.register(Mentor)
admin.site.register(Project)    
admin.site.register(Mentee)
# admin.site.register(ProjectCategory)
admin.site.register(MenteePreference)
