from django.db import models
from django.core.exceptions import ValidationError

from utils.models import WithTimestamp
from django.contrib.auth import get_user_model
import os
from django.contrib.contenttypes.fields import GenericRelation
from notification.models import Notification

def post_images_filepath(self, filename):
    # filename, file_extension = os.path.splitext(filename)
    return f'posts/{self.post.pk}/{filename}'


def validate_file_size(value):
    filesize = value.size
    if filesize > 2621440:
        raise ValidationError(
            "The maximum file size that can be uploaded is 10MB")
    else:
        return value



class PostImage(models.Model):
    post = models.ForeignKey(
        "Post", related_name="images", on_delete=models.CASCADE)
    image = models.FileField("image", upload_to=post_images_filepath, validators=[
                             validate_file_size], max_length=100)
    notifications = GenericRelation(Notification)

    def __str__(self):
        return self.image.url



class Post(WithTimestamp, models.Model):
    content = models.TextField()
    owner = models.ForeignKey(
        get_user_model(), related_name='posts', on_delete=models.CASCADE)
    notifications = GenericRelation(Notification)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.content



class PostLike(WithTimestamp, models.Model):
    owner = models.ForeignKey(
        get_user_model(), related_name='likes', on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='likes',
                             on_delete=models.CASCADE)
    notifications = GenericRelation(Notification)



class Comment(WithTimestamp, models.Model):
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    post = models.ForeignKey(
        Post, related_name='comments', on_delete=models.CASCADE)
    content = models.TextField(blank=False)
    notifications = GenericRelation(Notification)

    def __str__(self):
        return self.content
