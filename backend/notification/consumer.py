from channels.generic.websocket import JsonWebsocketConsumer
from accounts.models import User
from asgiref.sync import async_to_sync


class NotificationConsumer(JsonWebsocketConsumer):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.room_name = 'notifications'

    def connect(self):
        self.accept()
        print('connected!')

        # async_to_sync(self.channel_layer.group_add)(
        #     self.room_name,
        #     self.channel_name,
        # )


    def receive_json(self, content, **kwargs):
        return super().receive_json(content, **kwargs)

    def disconnect(self, code):
        print('disconnected !')