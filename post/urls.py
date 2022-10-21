from django.urls import path
from post.views import CommentListAPIView, CommentRetrieveUpdateDestroyAPIView, PostListAPIView, PostRetrieveUpdateDestroyAPIView, UserPostsListAPIView

urlpatterns = [
    path('',PostListAPIView.as_view()),
    path('user/',UserPostsListAPIView.as_view()),
    path('<int:id>/',PostRetrieveUpdateDestroyAPIView.as_view()),

    path('comments/',CommentListAPIView.as_view()),
    path('comments/<int:id>/',CommentRetrieveUpdateDestroyAPIView.as_view()),
]
