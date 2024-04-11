from django.urls import path

from . import views

app_name = "projects"
urlpatterns = [
    path("", views.BasicProjectListView.as_view(), name="project_list"),
    # path("<int:pk>/", views.ProjectDetailView.as_view(), name="project_detail"),

    # path("add/", views.ProjectAddView.as_view(), name="project_add"),
]
