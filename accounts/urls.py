from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name="register"),
    path('login/', LoginAPIView.as_view(), name="login"),
    path('verify-account/', VerifyAccount.as_view(), name="verify-account"),
    path('email-reset-password/', EmailResetPassword.as_view(),
         name="email-reset-password"),
    path('reset-confirm/<uidb64>/<token>/', PasswordTokenCheckAPI.as_view(),
        name="reset-confirm"),
    path('reset-complete/', SetNewPasswordAPIView.as_view(),
        name="reset-complete"),

    path('user/', CurrentLoggedInUser.as_view({'get': 'retrieve'}), name="current_user"),

    path('users/', UserListAPIView.as_view(), name='users')

]
