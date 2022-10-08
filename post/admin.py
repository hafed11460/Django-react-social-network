from django.contrib import admin

from post.models import Comment, Post

# Register your models here.

class PostAdmin(admin.ModelAdmin):
    list_display = ['id','content','owner', 'created_at','updated_at']
    list_display_links=['id','content']

class CommentAdmin(admin.ModelAdmin):
    list_display = ['id','content','owner', 'created_at','updated_at']
    list_display_links=['id','content']
    # list_display = [field.name for field in Post._meta.get_fields()]

admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)