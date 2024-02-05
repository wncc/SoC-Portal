from django.contrib import admin

from .models import Mentee, MenteePreference


class MenteePreferenceInline(admin.TabularInline):
    model = MenteePreference
    max_num = 3
    extra = 1


class MenteeAdmin(admin.ModelAdmin):
    model = Mentee
    inlines = [MenteePreferenceInline]


# Register your models here.
admin.site.register(Mentee, MenteeAdmin)
