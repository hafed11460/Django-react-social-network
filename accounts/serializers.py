from dataclasses import fields
from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer

# from store.api.serializers import StoreSerializer
from rest_framework import serializers
from .models import  User
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
# from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from accounts.utils import Util
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

class SetLangSerializer(serializers.Serializer):
    lang = serializers.CharField(min_length=2,max_length=2)
    class Meta:
        fields = ['lang']


    def validate(self, attrs):
        lang = attrs.get('lang', '')
        return {
            'lang':lang,
        }



class UserSerializer(ModelSerializer):
    # store = StoreSerializer(many=False, read_only=True)
    class Meta:
        model= User
        fields= ['id','firstname','lastname']



class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=68, min_length=6, write_only=True)
    confirm_password = serializers.CharField(
        max_length=68, min_length=6, write_only=True)
    default_error_messages = {
        'firstname': 'The firstname should only contain alphanumeric characters'}

    class Meta:
        model = User
        fields = ['email', 'firstname', 'lastname', 'password','confirm_password']

    def validate(self, attrs):
        email = attrs.get('email', '')
        firstname = attrs.get('firstname', '')
        lastname = attrs.get('lastname', '')
        password = attrs.get('password', '')
        confirm_password = attrs.get('confirm_password', '')
        if confirm_password != password:
            raise serializers.ValidationError(
                {confirm_password:'Confirm password is not mutch'}
            )
        if not firstname.isalnum():
            raise serializers.ValidationError(
                self.default_error_messages)
        if not lastname.isalnum():
            raise serializers.ValidationError(
                self.default_error_messages)
        return attrs

    def create(self, validated_data):
        return User.objects.create_vendor(**validated_data)


class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = User
        fields = ['token']


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        max_length=255, min_length=3,write_only=True)
    password = serializers.CharField(
        max_length=68, min_length=3, write_only=True)
    tokens = serializers.DictField(read_only=True)
    user = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [ 'email', 'password','tokens','user' ]

    def get_user(self, obj):
        user = User.objects.get(email=obj['email'])

        return {
            'firstname': user.firstname,
            'lastname': user.lastname,
            'email': user.email,
        }

    def validate(self, attrs):
        email = attrs.get('email', '')
        password = attrs.get('password', '')
        user = auth.authenticate(email=email, password=password)

        if not user:
            raise AuthenticationFailed({'errors':'Invalid credentials, try again'})
        if not user.is_active:
            raise AuthenticationFailed({'errors':'Account disabled, contact admin'})
        if not user.is_verified:
            raise AuthenticationFailed({'errors':'Email is not verified'})

        return {
            'email': user.email,
            'tokens': user.tokens,
        }



class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)
    class Meta:
        fields = ['email']


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=6,max_length=68,write_only=True)
    token = serializers.CharField(min_length=1,write_only=True)
    uidb64 = serializers.CharField(min_length=1,write_only=True)

    class Meta:
        fields = ['password','token','uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user,token):
                raise AuthenticationFailed('The reset link is invalid',401)

            user.set_password(password)
            user.save()
            return user
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid',401)