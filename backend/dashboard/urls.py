from django.urls import path
from .views import ProjectSubmitView

app_name = "dashboard"
urlpatterns = [
    path("mentor/submit/", ProjectSubmitView.as_view(), name="mentor_submit"),
]
