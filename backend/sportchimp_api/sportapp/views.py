from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import permissions

from datetime import datetime

from . import serializers
from . import models


class SportViewSet(viewsets.ViewSet):
    # GET: http://127.0.0.1:8000/sports/
    def list(self, request, format=None):
        queryset = models.Sport.objects.all()

        # GET http://127.0.0.1:8000/sports/?order_by=name
        if request.GET.get("name") is not None:
            queryset = models.Sport.objects.filter(name=request.GET.get("name"))
        if request.GET.get("order_by") is not None:
            queryset = queryset.order_by(request.GET.get("order_by"))

        serializer = serializers.SportSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    # POST http://127.0.0.1:8000/sports/
    def create(self, request, format=None):
        sport = models.Sport.objects.create(
            name=request.data["name"],
            description=request.data["description"]
        )
        return Response(
            {
                "id": sport.pk,
                "name": sport.name,
                "description": sport.description
            },
            status=201
        )

    # GET: http://127.0.0.1:8000/sports/id
    def retrieve(self, request, pk=None, format=None):
        try:
            sport = models.Sport.objects.get(pk=pk)
            return Response(
                {
                    "id": sport.pk,
                    "name": sport.name,
                    "description": sport.description
                },
                status=200
            )
        except models.Sport.DoesNotExist:
            return Response({"error": "Sport does not exist"}, status=404)

    # PUT http://127.0.0.1:8000/sports/id
    def update(self, request, pk=None, format=None):
        try:
            sport = models.Sport.objects.get(pk=pk)
            sport.name = request.data["name"]
            sport.description = request.data["description"]
            sport.save()
            return Response(
                {
                    "id": sport.pk,
                    "name": sport.name,
                    "description": sport.description
                },
                status=200
            )
        except models.Sport.DoesNotExist:
            return Response(status=404)

    def partial_update(self, request, pk=None, format=None):
        # We do not allow partial updates here
        # So we return a 405 instead.
        return Response(status=405)

    # DELETE http://127.0.0.1:8000/sports/id
    def destroy(self, request, pk=None, format=None):
        models.Sport.objects.filter(pk=pk).delete()
        return Response(status=204)


# TODO Activity:
class ActivityViewSet(viewsets.ViewSet):
    # GET: http://127.0.0.1:8000/activities
    def list(self, request, format=None):
        queryset = models.Activity.objects.all()

        # GET http://127.0.0.1:8000/activities/?order_by=sport_genre
        if request.GET.get("sport_genre") is not None:
            queryset = models.Activity.objects.filter(pk=request.GET.get("sport_genre"))
        if request.GET.get("order_by") is not None:
            queryset = queryset.order_by(request.GET.get("order_by"))

        serializer = serializers.ActivitySerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    # POST http://127.0.0.1:8000/activities/
    def create(self, request, format=None):
        activity = models.Activity.objects.create(
            title=request.data["title"],
            description=request.data["description"],
            date=request.data["date"],
            is_public=request.data["is_public"],
            location=request.data["location"],
            # TODO: ?? idk if best practice
            sport_genre=models.Sport.objects.get(id=request.data["sport_genre"])
        )
        serializer = serializers.ActivitySerializer(activity)
        return Response(serializer.data, status=200)

    # GET: http://127.0.0.1:8000/activities/id
    def retrieve(self, request, pk=None, format=None):
        try:
            activity = models.Activity.objects.get(pk=pk)
            serializer = serializers.ActivitySerializer2(activity)
            return Response(serializer.data, status=200)

        except models.Activity.DoesNotExist:
            return Response({"error": "Activity does not exist"}, status=404)

    # PUT http://127.0.0.1:8000/activites/id
    def update(self, request, pk=None, format=None):
        try:
            activity = models.Activity.objects.get(pk=pk)
            activity.title = request.data["title"]
            activity.sport_genre = models.Sport.objects.get(id=request.data["sport_genre"])
            activity.description = request.data["description"]
            activity.date = request.data["date"]
            activity.location = request.data["location"]
            activity.is_public = request.data["is_public"]
            activity.save()
            return Response(
                {

                },
                status=200
            )
        except models.Activity.DoesNotExist:
            return Response(status=404)


# TODO Comment:
class CommentViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    # GET: http://127.0.0.1:8000/comments/
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

    # GET: http://127.0.0.1:8000/comments/pk
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

    # TODO: POST http://127.0.0.1:8000/comments/
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
