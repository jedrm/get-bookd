from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import RegisterUser, LogoutUser, RetrieveCurrentUser

urlpatterns = [
    path('register', RegisterUser.as_view()),
    path('logout', LogoutUser.as_view()),
    path('me', RetrieveCurrentUser.as_view()),

    path('login', TokenObtainPairView.as_view()),
]