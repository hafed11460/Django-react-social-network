from django.contrib import admin

from post.models import Comment, Post, PostLike

# Register your models here.

class PostAdmin(admin.ModelAdmin):
    list_display = ['id','content','owner', 'created_at','updated_at','deleted_at']
    list_display_links=['id','content']

class CommentAdmin(admin.ModelAdmin):
    list_display = ['id','content','owner', 'created_at','updated_at','deleted_at']
    list_display_links=['id','content']

class LikeAdmin(admin.ModelAdmin):
    list_display = ['id','post','owner', 'created_at','updated_at','deleted_at']
    list_display_links=['id','post']
    # list_display = [field.name for field in Post._meta.get_fields()]

admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(PostLike, LikeAdmin)