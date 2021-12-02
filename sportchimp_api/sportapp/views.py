import json
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import permissions

from . import models

## DONE MODELS
class SportViewSet(viewsets.ViewSet):
    def list(self, request, format = None):
        queryset = models.Sport.objects.all()
        if request.GET.get("name") is not None:
            queryset = models.Sport.objects.filter(name = request.GET.get("name"))
        return Response(
            [(sport.pk, sport.name, sport.description) for sport in queryset],
            status = 200
        )

    def retrieve(self, request, pk = None, format = None):
        try:
            sport = models.Sport.objects.get(pk = pk)
            return Response(
                {
                    "pk": sport.pk,
                    "name": sport.name,
                    "description": sport.description
                },
                status = 200
            )
        except models.Sport.DoesNotExist:
            return Response(
                {"error": "Sport does not exist"},
                status = 404
            )

class CommentViewSet(viewsets.ViewSet):
    def list(self, request, format = None):
        queryset = models.Comment.objects.all()
        return Response(
            [(
            comment.pk,
            comment.activity.pk,
            comment.created_at,
            comment.activity.title,
            comment.created_by_user.username,
            comment.text
            ) for comment in queryset],
            status = 200
        )

    def retrieve(self, request, pk = None, format = None):
        try:
            comment = models.Comment.objects.get(pk = pk)
            return Response(
                {
                    "pk": comment.pk,
                    "activity.pk": comment.activity.pk,
                    "created_at":comment.created_at,
                    "activity.title": comment.activity.title,
                    "created_by_user.username": comment.created_by_user.username,
                    "text": comment.text
                },
                status = 200
            )
        except models.Comment.DoesNotExist:
            return Response(
                {"error": "Comment does not exist"},
                status = 404
            )
## DONE MODELS

## TODO:
class ActivityViewSet(viewsets.ViewSet):
    def list(self, request, format = None):
        queryset = models.Activity.objects.all()
        if request.GET.get("title") is not None:
            queryset = models.Event.objects.filter(title = request.GET.get("title"))
        return Response(
            [(
                activity.pk,
                activity.title,
                activity.description,
                activity.date,
                activity.sport_genre.name,
                activity.created_by_user.username, 
                str(activity.participants.all()), # Object of type User is not JSON serializable
                activity.location
                ) 

                for activity in queryset],
            status = 200
        )

    def retrieve(self, request, pk = None, format = None):
        try:
            activity = models.Activity.objects.get(pk = pk)
            return Response(
                {
                    "pk": activity.pk,
                    "title": activity.title,
                    "description": activity.description,
                    "date": activity.date,
                    "sport_genre": activity.sport_genre.name,
                    "created_by_user": activity.created_by_user.username,
                    "participants": str(activity.participants.all()),
                    "location": activity.location
                },
                status = 200
            )
        except models.Activity.DoesNotExist:
            return Response(
                {"error": "Event does not exist"},
                status = 404
            )




##