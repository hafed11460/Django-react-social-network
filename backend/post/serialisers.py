
from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from .models import Comment, Post, PostLike, PostImage
from accounts.serializers import ProfileImageSerializer, UserSerializer


class PostImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    class Meta:
        model = PostImage
        fields = ['id','post', 'image']

    def get_image(self,obj):
        request = self.context.get('request')
        image_url = obj.image.url
        # return image_url
        return request.build_absolute_uri(image_url)


class CommentSerializer(serializers.ModelSerializer):
    owner = UserSerializer(many=False, read_only=True)
    class Meta:
        model=Comment
        read_only_fields = (
            "owner",
            "created_at",
        )
        fields = (
            "id",
            "content",
            "post",
            "owner",
            "created_at",
        )


class LikeSerializer(serializers.ModelSerializer):
    owner = UserSerializer(many=False, read_only=True)
    class Meta:
        model=PostLike
        fields=['id','owner','post']


class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    owner = UserSerializer(many=False, read_only=True)
    profile = ProfileImageSerializer(many=False,read_only=True)
    images = PostImageSerializer(many=True, read_only=True)
    class Meta:
        model = Post
        read_only_fields = (
            "id",
            "created_at",
            "owner",
            'comments',
            'profile',
            "images"
        )
        fields = (
            "id",
            "content",
            "owner",
            'comments',
            'profile',
            "created_at",
            "images",
        )
