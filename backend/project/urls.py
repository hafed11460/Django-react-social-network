
from django.contrib import admin
from django.urls import include, path, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/',include('accounts.urls')),
    path('',include('project.router')),
    # path('api-auth/', include('rest_fram ework.urls')),
    # path('posts/',include('post.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


urlpatterns += [re_path(r'^.*',TemplateView.as_view(template_name='index.html'))]