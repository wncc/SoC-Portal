from django.contrib import admin
from django.urls import path

from . import views

app_name = "accounts"
urlpatterns = [
    # path("", views.UserListView.as_view(), name="user_list"),
    path("token/", views.CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    # path("list/", views.UserAutoCompleteView.as_view(), name="user_autocomplete"),
    path("profile/", views.UserProfileView.as_view(), name="user_profile"),
    # path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", views.RegisterUserView.as_view(), name="register_user"),
    path("verify-email/<str:token>/", views.verify_email, name="verify_email"),
    path('departments/', views.DepartmentListAPIView.as_view(), name='department-list'),
    path('years/', views.YearListAPIView.as_view(), name='year-list'),
    path('isloggedin/', views.isloggedin, name='loginstatus'),
    path('logout/', views.logout, name='logout'),

]
