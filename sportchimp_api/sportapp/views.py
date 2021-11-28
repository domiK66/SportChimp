import json
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import permissions

from . import models

class EventViewSet(viewsets.ViewSet):
    def list(self, request, format = None):
        queryset = models.Event.objects.all()
        if request.GET.get("title") is not None:
            queryset = models.Event.objects.filter(title = request.GET.get("title"))
        return Response(
            [(
                event.pk,
                event.title,
                event.description,
                event.date,
                str(event.created_by),
                str(event.participants.all()),
                event.location
                ) for event in queryset],
            status = 200
        )
    def retrieve(self, request, pk = None, format = None):
        try:
            event = models.Event.objects.get(pk = pk)
            return Response(
                {
                    "pk": event.pk,
                    "title": event.title,
                    "description": event.description,
                    "date": event.date,
                    "sport_genre": event.sport_genre.name,
                    "created_by": str(event.created_by),
                    "participants": str(event.participants.all()),
                    "location": event.location
                },
                status = 200
            )
        except models.Event.DoesNotExist:
            return Response(
                {"error": "Event does not exist"},
                status = 404
            )


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
