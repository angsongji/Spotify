from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.account_view import AccountLoginView,AccountRegisterView,VerifyEmailView,AccountLogoutView

from .views.song_view import SongListAPIView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

router = DefaultRouter()

urlpatterns = [
    path('api/', include(router.urls)),
    path('login/', AccountLoginView.as_view(), name='account-login'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', AccountRegisterView.as_view(), name='account-register'),
    path("verify-email/<str:token>/", VerifyEmailView.as_view(), name="verify-email"),
    path('logout/', AccountLogoutView.as_view(), name='account-logout'),
    path('songs/', SongListAPIView.as_view(), name='song-list'),

]

