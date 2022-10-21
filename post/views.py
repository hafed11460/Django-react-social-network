from urllib import request

from django.http import Http404
from post.permissions import IsOwner, IsOwnerOrReadOnly
from post.serialisers import CommentSerializer, LikeSerializer, PostSerializer
from post.models import Comment, Post, PostLike
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status


class PermissionPolicyMixin:
    def check_permissions(self, request):
        try:
            # This line is heavily inspired from `APIView.dispatch`.
            # It returns the method associated with an endpoint.
            handler = getattr(self, request.method.lower())
        except AttributeError:
            handler = None

        if (
            handler
            and self.permission_classes_per_method
            and self.permission_classes_per_method.get(handler.__name__)
        ):
            self.permission_classes = self.permission_classes_per_method.get(
                handler.__name__)

        super().check_permissions(request)


class PostsViewSet(PermissionPolicyMixin, ModelViewSet):
    # permission_classes=[IsAuthenticated]
    permission_classes_per_method = {
        # except for list and retrieve where both users with "write" or "read-only"
        # permissions can access the endpoints.
        "list": [IsAuthenticated],
        "retrieve": [IsAuthenticated],
        "update": [IsAuthenticated, IsOwner],
    }
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        return self.queryset.all()
        # return  self.queryset.filter(owner=self.request.user)

    @action(methods=['post'], detail=True ,url_path='set-like', url_name='set-like',)
    def set_like(self, request, pk=None):
        user = request.user
        post = self.get_object()
        try:
            PostLike.objects.get(owner=user, post=post).delete()
        except Exception:
            PostLike.objects.create(owner=user, post=post)
        return Response({'message': 'success'},
                        status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path='user-posts', url_name='user-posts',)
    def user_posts(self, request):
        posts = self.queryset.filter(owner=request.user)
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data,
                        status=status.HTTP_200_OK)


class CommentViewSet(PermissionPolicyMixin, ModelViewSet):
    permission_classes_per_method = {
        "list": [IsAuthenticated],
        "retrieve": [IsAuthenticated],
        "update": [IsAuthenticated, IsOwner],
    }
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def get_queryset(self):
        return self.queryset.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class LikeViewSet(ModelViewSet):
    permission_classes_per_method = {
        "list": [IsAuthenticated],
        "retrieve": [IsAuthenticated],
        "update": [IsAuthenticated, IsOwner],
    }

    serializer_class = LikeSerializer
    queryset = PostLike.objects.all()

    def get_queryset(self):
        return self.queryset.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
