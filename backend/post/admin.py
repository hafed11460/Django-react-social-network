from django.contrib import admin

from post.models import Comment, Post, PostLike , PostImage

# Register your models here.
class PostImageInline(admin.TabularInline):
    model = PostImage
class PostLikeInline(admin.TabularInline):
    model = PostLike
class PostCommentInline(admin.TabularInline):
    model = Comment

class PostAdmin(admin.ModelAdmin):
    list_display = ['id','content','owner', 'created_at','updated_at','deleted_at']
    list_display_links=['id','content']
    inlines = [PostImageInline,]

class CommentAdmin(admin.ModelAdmin):
    list_display = ['id','content','owner', 'created_at','updated_at','deleted_at']
    list_display_links=['id','content']

class LikeAdmin(admin.ModelAdmin):
    list_display = ['id','post','owner', 'created_at','updated_at','deleted_at']
    list_display_links=['id','post']
    # list_display = [field.name for field in Post._meta.get_fields()]

admin.site.register(Post, PostAdmin)
admin.site.register(PostImage)
admin.site.register(Comment, CommentAdmin)
admin.site.register(PostLike, LikeAdmin)