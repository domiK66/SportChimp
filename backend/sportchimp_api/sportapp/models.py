from datetime import datetime

from django.db import models

from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    birthday = models.DateField(null=True)
    bio = models.CharField(max_length=1024, null=True)
    profile_image = models.ImageField(upload_to='profile_images/', null=True, default='profile_images/user.png')
    follower = models.ManyToManyField('self', symmetrical=False)


class Sport(models.Model):
    name = models.CharField(max_length=1024)
    description = models.CharField(max_length=1024, null=True)
    image = models.ImageField(upload_to='images/', null=True)

    def __str__(self):
        return self.name


class Activity(models.Model):
    title = models.CharField(max_length=1024)
    description = models.CharField(max_length=1024, null=True)
    date = models.DateField()
    time = models.TimeField()
    min_players = models.IntegerField(default=2)
    max_players = models.IntegerField(default=30)
    location = models.CharField(max_length=1024)
    equipment_needed = models.BooleanField(default=True)
    sport_genre = models.ForeignKey(Sport, on_delete=models.PROTECT)
    created_by_user = models.ForeignKey(CustomUser, on_delete=models.PROTECT, related_name="activity_created_by_user", null=True)
    participants = models.ManyToManyField(CustomUser, related_name="participants")

    def __str__(self):
        return self.title


class Comment(models.Model):
    created_at = models.DateTimeField()
    activity = models.ForeignKey(Activity, on_delete=models.PROTECT)
    created_by_user = models.ForeignKey(CustomUser, on_delete=models.PROTECT, related_name="comment_created_by_user", null=True)
    text = models.CharField(max_length=1024)

    def __str__(self):
        return self.text


class Notification(models.Model):
    text = models.CharField(max_length=1024)
    activity = models.ForeignKey(Activity, on_delete=models.PROTECT, null=True)
    from_user = models.ForeignKey(CustomUser, null=True, on_delete=models.PROTECT)
    to_user = models.IntegerField(null=True)
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=datetime.now())

    def __str__(self):
        return self.text
