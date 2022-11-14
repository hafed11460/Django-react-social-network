"""
ASGI config for project project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
# from chats.middleware import TokenAuthMiddleware

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')

from project import ws_routing
from channels.routing import ProtocolTypeRouter, URLRouter  # noqa isort:skip

application = ProtocolTypeRouter(
    {
        # "http": get_asgi_application(),
        "websocket": URLRouter(ws_routing.websocket_urlpatterns),
        # "websocket": TokenAuthMiddleware(URLRouter(ws_routing.websocket_urlpatterns)),
    }
)

# from channels.auth import AuthMiddlewareStack
# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.security.websocket import AllowedHostsOriginValidator
# from django.urls import path, re_path

# from chat.consumers import ChatConsumer
# from public_chat.consumers import PublicChatConsumer
# from notification.consumers import NotificationConsumer


# application = ProtocolTypeRouter({
# 	'websocket': AllowedHostsOriginValidator(
# 		AuthMiddlewareStack(
# 			URLRouter([
# 					path('', NotificationConsumer),
# 					path('chat/<room_id>/', ChatConsumer),
# 					path('public_chat/<room_id>/', PublicChatConsumer),
# 			])
# 		)
# 	),
# })