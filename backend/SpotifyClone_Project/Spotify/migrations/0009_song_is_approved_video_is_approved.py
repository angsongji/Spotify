# Generated by Django 5.1.7 on 2025-05-01 07:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Spotify', '0008_playlist_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='song',
            name='is_approved',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='video',
            name='is_approved',
            field=models.BooleanField(default=False),
        ),
    ]
