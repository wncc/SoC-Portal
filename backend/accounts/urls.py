from django.contrib import admin
from django.urls import path

from . import views

app_name = "accounts"
urlpatterns = [
    # path("", views.UserListView.as_view(), name="user_list"),
    path("token/", views.CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("list/", views.UserAutoCompleteView.as_view(), name="user_autocomplete"),
    path(
        "create-profile/", views.CreateUserProfileView.as_view(), name="create_profile"
    ),
    # path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", views.RegisterUserView.as_view(), name="register_user"),
]
