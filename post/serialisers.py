
from rest_framework import serializers
from .models import Comment, Post


class CommentSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.id')
    class Meta:
        model=Comment
        fields = ['id','content','owner','post']


class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    # comments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    owner = serializers.ReadOnlyField(source='owner.id')

    class Meta:
        model = Post
        fields = ['id','content','comments','owner']
