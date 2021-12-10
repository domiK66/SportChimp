from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import permissions

from django.core import serializers


from datetime import datetime

from . import models


## SPORT
from .serializers import SportSerializer


class SportViewSet(viewsets.ViewSet):
    ## GET: http://127.0.0.1:8000/sports/
    def list(self, request, format=None):
        queryset = models.Sport.objects.all()

        ## GET http://127.0.0.1:8000/sports/?order_by=name
        if request.GET.get("name") is not None:
            queryset = models.Sport.objects.filter(name=request.GET.get("name"))
        if request.GET.get("order_by") is not None:
            queryset = queryset.order_by(request.GET.get("order_by"))

        serializer = SportSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    ## GET: http://127.0.0.1:8000/sports/pk
    def retrieve(self, request, pk=None, format=None):
        try:
            sport = models.Sport.objects.get(pk=pk)
            return Response(
                {
                    "pk": sport.pk,
                    "name": sport.name,
                    "description": sport.description
                },
                status=200
            )
        except models.Sport.DoesNotExist:
            return Response(
                {
                    "error": "Sport does not exist"
                },
                status=404
            )


## SPORT

## COMMENT
class CommentViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    ## GET: http://127.0.0.1:8000/comments/
    def list(self, request, format=None):
        queryset = models.Comment.objects.all()

        return Response([(comment.pk,
                          comment.activity.pk,
                          comment.created_at,
                          comment.activity.title,
                          comment.created_by_user.username,
                          comment.text)
                         for comment in queryset],
                        status=200
                        )

    ## GET: http://127.0.0.1:8000/comments/pk
    def retrieve(self, request, pk=None, format=None):
        try:
            comment = models.Comment.objects.get(pk=pk)
            return Response(
                {
                    "pk": comment.pk,
                    "activity.pk": comment.activity.pk,
                    "created_at": comment.created_at,
                    "activity.title": comment.activity.title,
                    "created_by_user.username": comment.created_by_user.username,
                    "text": comment.text
                },
                status=200
            )
        except models.Comment.DoesNotExist:
            return Response(
                {
                    "error": "Comment does not exist"
                },
                status=404
            )

    ## TODO: POST http://127.0.0.1:8000/comments/
    def create(self, request, format=None):
        # request.data contains a dictionary 
        # looking like this:
        # { 
        #   "activity_id": 1,
        #   "text": "shesh"
        #  }

        comment = models.Comment.objects.create(
            created_at=datetime.now(),
            activity=models.Activity.objects.get(pk=request.data["activity_id"]),
            # TODO: created_by_user 
            text=request.data["text"]
        )

        return Response(
            {
                "pk": comment.pk,
                "text": comment.text
            },
            status=201
        )


## COMMENT


## TODO ACTIVITY:
class ActivityViewSet(viewsets.ViewSet):
    ## GET: http://127.0.0.1:8000/activities
    def list(self, request, format=None):
        queryset = models.Activity.objects.all()

        ## GET http://127.0.0.1:8000/activities/?order_by=sport_genre
        if request.GET.get("sport_genre") is not None:
            queryset = models.Activity.objects.filter(pk=request.GET.get("sport_genre"))
        if request.GET.get("order_by") is not None:
            queryset = queryset.order_by(request.GET.get("order_by"))

        return Response([(
            activity.pk,
            activity.title,
            activity.description,
            activity.date,
            activity.sport_genre.name,
            activity.created_by_user.username,
            serializers.serialize("json", activity.participants.all()),  # Object of type User is not JSON serializable
            activity.location) for activity in queryset
        ],
            status=200
        )

    ## GET: http://127.0.0.1:8000/activities/pk
    def retrieve(self, request, pk=None, format=None):
        try:
            activity = models.Activity.objects.get(pk=pk)
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
                status=200
            )
        except models.Activity.DoesNotExist:
            return Response(
                {
                    "error": "Event does not exist"
                },
                status=404
            )
## TODO ACTIVITY:
