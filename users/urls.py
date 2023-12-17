from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', views.register),
    path('login/', views.LoginView.as_view()),
    path('refresh/', TokenRefreshView.as_view()),
    path('get/', views.get_users),
    path('delete/<int:pk>', views.delete_user),
    path('search/', views.get_user_by_email),
    path('edit/<str:email>', views.edit_profile),
    path('detail/<int:pk>', views.get_user_by_id),
]
