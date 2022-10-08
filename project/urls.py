
from django.contrib import admin
from django.urls import include, path
# from .router import router

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('auth/',include('accounts.urls')),
    path('posts/',include('post.urls')),
    # path('api/',include(router.urls))
]
