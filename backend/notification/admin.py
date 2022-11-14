from django.contrib import admin

from notification.models import Notification

# Register your models here.

class NotificationAdmin(admin.ModelAdmin):
    list_display = ['id','target','from_user', 'verb', 'created_at','updated_at','deleted_at']
    list_display_links=['id','target','from_user']


admin.site.register(Notification, NotificationAdmin)