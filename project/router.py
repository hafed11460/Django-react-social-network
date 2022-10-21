

from rest_framework.routers import DefaultRouter, SimpleRouter
from project import settings
from post.views import CommentViewSet, LikeViewSet, PostsViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register('posts', PostsViewSet, basename='posts')
router.register('posts-comments', CommentViewSet, basename='comments')
router.register('posts-likes', LikeViewSet, basename='posts_likes')

urlpatterns = router.urls
