from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views.song_view import SongListAPIView, SongDetailAPIView, SongViewSet,SongAllInListAPIView
from .views.account_view import AccountLoginView, AccountRegisterView, VerifyEmailView, AccountLogoutView
from .views.search_view import Search
from .views.artist_view import ArtistListAPIView, get_artist_songs
from .views.album_view import AlbumListAPIView, AlbumDetailAPIView, SongByAlbumAPIView, AlbumByAccountAPIView,AllAlbumAPIView
from .views.video_view import VideoListAPIView, VideoDetailAPIView
from .views.playlist_view import get_playlists_by_account, PlaylistDetailAPIView, SongByPlaylistAPIView, PlaylistSongCreateView
from .views.user_view import get_user_by_account,UserListView,UpdateUserRoleView
from .views.musicgenre_view import get_music_genres,add_music_genre,delete_music_genre
from .views.presigned_view import get_presigned_url, delete_s3_file
from rest_framework_simplejwt.views import TokenRefreshView
from .views.pusher_view import MessageAPIView
# from chat import consumers


urlpatterns = [

    # Các URL còn lại
    path('login/', AccountLoginView.as_view(), name='account-login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', AccountRegisterView.as_view(), name='account-register'),
    path("verify-email/<str:token>/", VerifyEmailView.as_view(), name="verify-email"),
    path('logout/', AccountLogoutView.as_view(), name='account-logout'),
    path('songs/', SongListAPIView.as_view(), name='song-public-list'),
    path('all-songs/', SongAllInListAPIView.as_view(), name='all-song'),
    path('songs/<int:id>/', SongDetailAPIView.as_view(), name='song-detail'),
    path('artists/', ArtistListAPIView.as_view(), name='artist-list'),
    path('albums/', AlbumListAPIView.as_view(), name='album-list'),
    path('all-albums/', AllAlbumAPIView.as_view(), name='all-album-list'),
    path('albums/<int:id>/', AlbumDetailAPIView.as_view(), name='album-detail'),
    path('songs-by-album/<int:album_id>/', SongByAlbumAPIView.as_view(), name='songs-by-album'),
    path('videos/', VideoListAPIView.as_view(), name='video-list'),
    path('videos/<int:pk>/', VideoDetailAPIView.as_view(), name='video-detail'),
    path('search/', Search, name='search'),
    path('playlists/<int:account_id>/', get_playlists_by_account),
    path('playlist/<int:id>/', PlaylistDetailAPIView.as_view(), name='playlist_detail'),
    path('playlist/<int:playlist_id>/songs/', SongByPlaylistAPIView.as_view(), name='songs_by_playlist'),
    path('playlist_song/', PlaylistSongCreateView.as_view(), name='add-to-playlist'),
    path('users/', UserListView.as_view(), name='user-list'),   
    path('user/by-account/<int:account_id>/', get_user_by_account),
    path('users/<int:user_id>/update-role/', UpdateUserRoleView.as_view(), name='update-role'),
    path('song/by-artist/<int:account_id>/', get_artist_songs),
    path('music-genres/', get_music_genres, name='get-music-genres'),
    path('music-genres/add/', add_music_genre, name='add-music-genre'),
    path('music-genres/delete/<int:pk>/', delete_music_genre, name='delete-music-genre'),
    path("albums/by-account/<int:account_id>/", AlbumByAccountAPIView.as_view(), name="albums-by-account"),
    path('s3/presign/', get_presigned_url, name='get_presigned_url'),
    path('s3/delete/', delete_s3_file, name='delete_s3_file'),
    path('song/', SongViewSet.as_view({'post': 'create'}), name='song-create'),
    path('song/<int:pk>/', SongViewSet.as_view({
            'put': 'update',
            'delete': 'destroy'
        }), name='song-detail'),

    path('messages/', MessageAPIView.as_view()),
]
