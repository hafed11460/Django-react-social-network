from tokenize import blank_re
from django.db import models

from utils.models import  WithTimestamp
from django.contrib.auth import get_user_model
# Create your models here.

class Post(WithTimestamp,models.Model):
    content = models.TextField()
    owner = models.ForeignKey(get_user_model(),related_name='posts', on_delete=models.CASCADE)

    def __str__(self):
        return self.content

class PostLike(WithTimestamp,models.Model):
    owner = models.ForeignKey(get_user_model(),related_name='likes', on_delete=models.CASCADE)
    post = models.ForeignKey(Post,related_name='likes', on_delete=models.CASCADE)


class Comment(WithTimestamp,models.Model):
    owner   = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    post    =    models.ForeignKey(
        Post, related_name='comments', on_delete=models.CASCADE)
    content = models.TextField(blank=False)
    def __str__(self):
        return self.content