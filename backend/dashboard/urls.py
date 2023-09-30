
from django.urls import path
from .views import ProjectCreateView

urlpatterns = [
    path('', ProjectCreateView.as_view(), name='dashboard'),
]
