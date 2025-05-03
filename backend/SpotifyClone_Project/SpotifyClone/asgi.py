import os
import django
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import chat.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'SpotifyClone.settings')
django.setup()

application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # ✅ Không bỏ dòng này nếu vẫn muốn xử lý HTTP
    "websocket": AuthMiddlewareStack(
        URLRouter(
            chat.routing.websocket_urlpatterns
        )
    ),
})
