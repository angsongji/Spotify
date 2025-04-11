from django.contrib import admin
from .models import Account,  Account_Premium, Album, Artist, MusicGenres, Permission, Playlist, \
    Playlist_Song,  PremiumPlan, Role, RolePermission, Song,  User, Video

# Đăng ký từng model vào admin
admin.site.register(Account)
admin.site.register(Account_Premium)
admin.site.register(Album)
admin.site.register(Artist)
admin.site.register(MusicGenres)
admin.site.register(Permission)
admin.site.register(Playlist)
admin.site.register(Playlist_Song)
admin.site.register(PremiumPlan)
admin.site.register(Role)
admin.site.register(RolePermission)
admin.site.register(Song)
admin.site.register(User)
admin.site.register(Video)