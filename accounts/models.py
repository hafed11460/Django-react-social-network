from django.db import models

# Create your models here.
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin)

from django.db import models
from rest_framework_simplejwt.tokens import RefreshToken

from utils.models import WithTimestamp



class UserManager(BaseUserManager):

    def create_vendor(self, firstname, lastname, email, password=None):
        if firstname is None:
            raise TypeError('Users should have a firstname')
        if lastname is None:
            raise TypeError('Users should have a firstname')
        if email is None:
            raise TypeError('Users should have a Email')

        user = self.model(firstname=firstname,lastname=lastname, email=self.normalize_email(email))
        user.set_password(password)
        user.save()
        return user

    def create_user(self, firstname, lastname, email, password=None):
        if firstname is None:
            raise TypeError('Users should have a firstname')
        if lastname is None:
            raise TypeError('Users should have a firstname')
        if email is None:
            raise TypeError('Users should have a Email')

        user = self.model(firstname=firstname,lastname=lastname, email=self.normalize_email(email))
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, firstname, lastname, email, password=None):
        if password is None:
            raise TypeError('Password should not be none')

        user = self.create_user(
            email=self.normalize_email(email),
            firstname=firstname,
            lastname=lastname,
            password=password,
        )

        user.is_superuser = True
        user.is_admin = True
        user.is_staff = True
        user.save()
        return user


#

class User(WithTimestamp,AbstractBaseUser, PermissionsMixin):
    firstname   = models.CharField(max_length=255)
    lastname    = models.CharField(max_length=255)
    email       = models.EmailField(max_length=255, unique=True, db_index=True)

    is_verified = models.BooleanField(default=False)
    is_active   = models.BooleanField(default=True)
    is_staff    = models.BooleanField(default=False)

    # auth_provider = models.CharField(
    #     max_length=255, blank=False,
    #     null=False, default=AUTH_PROVIDERS.get('email'))

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstname','lastname']

    objects = UserManager()

    def __str__(self):
        return self.email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }