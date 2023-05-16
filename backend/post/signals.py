from notification.models import Notification
from post.models import Comment
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings


@receiver(post_save, sender=Comment)
def create_post_notification(sender, instance, created, **kwargs):
	if created:
		instance.notifications.create(
			target=instance.post.owner,
			from_user=instance.owner,
			redirect_url=f"{settings.BASE_URL}/comment/{instance.owner.pk}/",
			verb=f"{instance.owner.firstname} sent you a friend request.",
			content_type=instance,
		)


# @receiver(post_save, sender=Comment)
# def create_notification(sender, instance, created, **kwargs):
#     if created:
#         if instance.owner != instance.post.owner:
#             Notification.objects.create(
#                 target=instance.post.owner,
#                 from_user=instance.owner,
#                 verb=f'{instance.owner} add Comment to your posts',
#             )