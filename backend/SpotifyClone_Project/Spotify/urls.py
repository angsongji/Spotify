from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.account_view import AccountLoginView,AccountRegisterView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

router = DefaultRouter()

urlpatterns = [
    path('api/', include(router.urls)),
    path('login/', AccountLoginView.as_view(), name='account-login'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', AccountRegisterView.as_view(), name='account-register'),
]

