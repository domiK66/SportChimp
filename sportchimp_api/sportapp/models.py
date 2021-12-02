from django.db import models

from django.contrib.auth.models import User


class Sport(models.Model):
    name = models.CharField(max_length = 1024)
    description = models.CharField(max_length = 1024, null = True)
    #TODO: image

    def __str__(self):
        return self.name


class Activity(models.Model):
    title = models.CharField(max_length = 1024)
    description = models.CharField(max_length = 1024, null = True)
    date = models.DateField()
    sport_genre = models.ForeignKey(Sport, on_delete = models.PROTECT)
    created_by = models.ForeignKey(User, on_delete = models.PROTECT, related_name="created_by", null = True)
    participants = models.ManyToManyField(User, related_name="participants")
    #tbd
    location = models.CharField(max_length = 1024)
