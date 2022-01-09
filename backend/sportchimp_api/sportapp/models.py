from django.db import models

from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    birthday = models.DateField(null=True)
    bio = models.CharField(max_length=1024, null=True)
    profile_image = models.ImageField(upload_to='profile_images/', null=True, default='profile_images/user.png')


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
    # TODO: location
    location = models.CharField(max_length=1024)
    is_public = models.BooleanField(default=True)
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


class FriendshipRequest(models.Model):
    from_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='friendship_requests_sent')
    to_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='friendship_requests_received')


class Friend(models.Model):
    to_user = models.ForeignKey(CustomUser, models.CASCADE, related_name='friends')
    from_user = models.ForeignKey(CustomUser, models.CASCADE, related_name='_unused_friend_relation')



