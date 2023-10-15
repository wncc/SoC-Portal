from django.urls import path

from .views import DashboardView, MenteeView, ProjectSubmitView

app_name = "dashboard"
urlpatterns = [
    path("", DashboardView.as_view(), name="dashboard"),
    path("mentor/submit/", ProjectSubmitView.as_view(), name="mentor_submit"),
    path("mentee/submit/", MenteeView.as_view(), name="mentee_submit"),
]
