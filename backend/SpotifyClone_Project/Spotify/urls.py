from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.account_view import AccountLoginView,AccountRegisterView,VerifyEmailView,AccountLogoutView
from .views.search_view import Search
from .views.song_view import SongListAPIView,SongDetailAPIView
from .views.artist_view import ArtistListAPIView
from .views.album_view import AlbumListAPIView, AlbumDetailAPIView,SongByAlbumAPIView
from .views.video_view import VideoListAPIView, VideoDetailAPIView
from .views.playlist_view import get_playlists_by_account, PlaylistDetailAPIView, SongByPlaylistAPIView,PlaylistSongCreateView


from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

router = DefaultRouter()

urlpatterns = [
    path('api/', include(router.urls)),
    path('login/', AccountLoginView.as_view(), name='account-login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', AccountRegisterView.as_view(), name='account-register'),
    path("verify-email/<str:token>/", VerifyEmailView.as_view(), name="verify-email"),
    path('logout/', AccountLogoutView.as_view(), name='account-logout'),
    path('songs/', SongListAPIView.as_view(), name='song-list'),
    path('artists/', ArtistListAPIView.as_view(), name='artist-list'),
    path('albums/', AlbumListAPIView.as_view(), name='album-list'),
    path('albums/<int:id>/', AlbumDetailAPIView.as_view(), name='album-detail'),
    path('songs-by-album/<int:album_id>/', SongByAlbumAPIView.as_view(), name='songs-by-album'),
    path('song/<int:id>/', SongDetailAPIView.as_view(), name='song-detail'),
    path('videos/', VideoListAPIView.as_view(), name='video-list'),
    path('videos/<int:pk>/', VideoDetailAPIView.as_view(), name='video-detail'),
    path('search/', Search, name='search' ),
    path('playlists/<int:account_id>/', get_playlists_by_account),
    path('playlist/<int:id>/', PlaylistDetailAPIView.as_view(), name='playlist_detail'),
    path('playlist/<int:playlist_id>/songs/', SongByPlaylistAPIView.as_view(), name='songs_by_playlist'),
    path('playlist_song/', PlaylistSongCreateView.as_view(), name='add-to-playlist'),
]

