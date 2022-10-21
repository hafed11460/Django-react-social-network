from django.urls import path

from notification.consumer import NotificationConsumer


websocket_urlpatterns =[
    # path('chats/<conversation_name>/',ChatConsumer.as_asgi()),
    path('notifications/',NotificationConsumer.as_asgi())
]