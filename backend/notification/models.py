from email.policy import default
from django.db import models

from utils.models import WithTimestamp
from django.contrib.auth import get_user_model

# Create your models here.
class Notification(WithTimestamp,models.Model):
    target = models.ForeignKey(get_user_model(),on_delete=models.CASCADE)
    from_user = models.ForeignKey(get_user_model(),on_delete=models.CASCADE, null=True, blank=True, related_name="from_user")
    read = models.BooleanField(default=False)
    verb = models.CharField(max_length=255, unique=False, blank=True, null=True)

    def __str__(self):
        return self.verb
