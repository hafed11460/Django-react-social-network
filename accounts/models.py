from distutils.command.upload import upload
from email.policy import default
from hashlib import blake2b
from django.db import models

# Create your models here.
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin)

from django.db import models
from rest_framework_simplejwt.tokens import RefreshToken
from utils.models import WithTimestamp
import os

class UserManager(BaseUserManager):

    def create_user(self, firstname, lastname, email, password=None):
        if firstname is None:
            raise TypeError('Users should have a firstname')
        if lastname is None:
            raise TypeError('Users should have a firstname')
        if email is None:
            raise TypeError('Users should have a Email')
        email = str(email).lower()
        user = self.model(
            firstname=firstname,
            lastname=lastname,
            email=self.normalize_email(email)
        )
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

class User(WithTimestamp, AbstractBaseUser, PermissionsMixin):
    # username = None
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True, db_index=True)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstname', 'lastname']

    objects = UserManager()

    def __str__(self):
        return self.email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }


def get_offer_file_filepath(self, filename):
    filename, file_extension = os.path.splitext(filename)
    return f'offer_files/{self.offer.pk}/{self.offer.pk}{file_extension}'


def get_profile_image_filepath(self, filename):
    return f'profile_images/{self.user.pk}/{"profile_image.png"}'


def get_default_profile_image():
    return "profile_images/default.png"

# class UserImage(models.Model)
class Profile(WithTimestamp,models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(
        'image', default=get_default_profile_image,
         upload_to=get_profile_image_filepath)

    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user.firstname


class UserProfileImage(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(
        'image', default=get_default_profile_image,
        upload_to=get_profile_image_filepath)
