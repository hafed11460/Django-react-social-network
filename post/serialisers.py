
from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from .models import Comment, Post, PostLike
from accounts.serializers import ProfileImageSerializer, UserSerializer

class CommentSerializer(serializers.ModelSerializer):
    owner = UserSerializer(many=False, read_only=True)
    class Meta:
        model=Comment

        fields = ['id','content','owner','post']

class LikeSerializer(serializers.ModelSerializer):
    owner = UserSerializer(many=False, read_only=True)
    class Meta:
        model=PostLike
        fields=['id','owner','post']


class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    owner = UserSerializer(many=False, read_only=True)
    profile = ProfileImageSerializer(many=False,read_only=True)
    class Meta:
        model = Post
        read_only_fields = (
            "id",
            "created_at",
            "owner",
            'comments',
            'profile',
        )
        fields = (
            "id",
            "content",
            "owner",
            'comments',
            'profile',
        )
