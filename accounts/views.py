from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.contrib.sites.shortcuts import get_current_site

from accounts.serializers import EmailVerificationSerializer, SetLangSerializer,SetNewPasswordSerializer, LoginSerializer, RegisterSerializer, ResetPasswordEmailRequestSerializer
from accounts.models import User
from accounts.utils import Util
from accounts.serializers import UserSerializer

from rest_framework import generics, status, views, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from accounts.utils import Util
import jwt
from django.utils.translation import gettext_lazy as _
from django.utils.translation import get_language , activate, gettext
from django.utils import translation
from rest_framework.generics import ListAPIView


class UserListAPIView(ListAPIView):
    serializer_class = UserSerializer
    queryset =  User.objects.all()

class SetLnaguage(generics.GenericAPIView):
    serializer_class = SetLangSerializer
    def post(self,request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        print(serializer.data)
        activate('ar')
        return Response({'success':True,'data':serializer.data,'message':_('Arabic') },status=status.HTTP_200_OK)

class CurrentLoggedInUser(ModelViewSet):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated, )
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        user = request.user
        # user= self.queryset.get(email=request.user.email)
        serializer = self.get_serializer(user)
        # role = user.role
        # role_name = 'Manager' if  (role.name == 'Manager' or role.name == 'Admin' ) else 'User'
        # user = {
        #     'id':user.id,
        #     'first_name':user.first_name,
        #     'last_name':user.last_name,
        #     'email':user.email,
        #     'is_active':user.is_active,
        #     'role': role_name,
        #     'role_id': role.id,
        #     'location':user.location.name,
        #     'profile_image':user.profile_image.url,
        # }
        # return Response({'user': user})
        return Response(serializer.data)

class RegisterView(generics.GenericAPIView):

    serializer_class = RegisterSerializer
    # renderer_classes = (UserRenderer,)

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data


        # user = User.objects.get(email=user_data['email'])

        # token = RefreshToken.for_user(user).access_token
        # current_site = get_current_site(request).domain
        # relativeLink = reverse('verify-account')
        # absurl = 'http://'+current_site+"/activate-account/"+"?token="+str(token)
        # # absurl = 'http://'+current_site+relativeLink+"?token="+str(token)
        # email_body = 'Hi '+user.firstname + \
        #     ' Use the link below to verify your email \n' + absurl
        # data = {'email_body': email_body, 'to_email': user.email,
        #         'email_subject': 'Verify your email'}

        # Util.send_email(data)
        return Response(user_data, status=status.HTTP_201_CREATED)

class VerifyAccount(views.APIView):
    serializer_class = EmailVerificationSerializer

    # token_param_config = openapi.Parameter(
    #     'token', in_=openapi.IN_QUERY, description='Description', type=openapi.TYPE_STRING)

    # @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        token = request.GET.get('token')

        try:
            payload = jwt.decode(token, settings.SECRET_KEY,algorithms=['HS256'])
            user = User.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified = True
                user.save()
            return Response({'email': 'Successfully activated'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return Response({'error': 'Activation Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class EmailResetPassword(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        # serializer = self.serializer_class(data=request.data)
        email = request.data['email']

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)

            current_site = get_current_site(request =request).domain
            # relativeLink = reverse('password-reset-confirm',kwargs={'uidb64':uidb64,'token':token})
            # absurl = 'http://'+current_site+ relativeLink
            absurl = f'http://{current_site}/auth/password-reset-confirm/{uidb64}/{token}/'
            email_body = 'Hello \n   Use the link below to reset your passwor \n' + absurl
            data = {'email_body': email_body, 'to_email': user.email,
                    'email_subject': 'Reset your password '}

            Util.send_email(data)
            return Response({'success':'We have sent a link to reset your password '}, status=status.HTTP_200_OK)
        return Response({'errors':'We cannot find account with this email '}, status=status.HTTP_403_FORBIDDEN)

class TestRequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        data = {'request':request,'data':request.data}
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        return Response({'success':'We have sent a link to reset your password '}, status=status.HTTP_200_OK)

class PasswordTokenCheckAPI(generics.GenericAPIView):
    def get(self,request,uidb64, token):

        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)


            if not PasswordResetTokenGenerator().check_token(user,token):
                return Response({'error':'Token is not valid , please request a new one '},status=status.HTTP_401_UNAUTHORIZED)

            return Response({'success':True, 'message':'Credentials valid ','uidb64':uidb64,'token':token},status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError:
            if not PasswordResetTokenGenerator().check_token(user,token):
                return Response({'erro':'Token is not valid , please request a new one '},status=status.HTTP_401_UNAUTHORIZED)

class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer
    def patch(self, request):
        serializer  = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success':True,'message':'Password Reset success'},status=status.HTTP_200_OK)