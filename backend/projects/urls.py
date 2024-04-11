from django.urls import path

from . import views

app_name = "projects"
urlpatterns = [
    path("", views.ProjectListView.as_view(), name="project_list"),
    path("add/", views.ProjectAddView.as_view(), name="project_add"),
]
