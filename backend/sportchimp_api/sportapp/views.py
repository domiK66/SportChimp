from rest_framework import viewsets
from rest_framework.permissions import DjangoModelPermissions, IsAuthenticated
from rest_framework.response import Response

from datetime import datetime

from . import serializers
from . import models

from .models import CustomUser


# Sport:
class SportViewSet(viewsets.ViewSet):
    # GET: http://127.0.0.1:8000/sports/
    def list(self, request):
        queryset = models.Sport.objects.all()

        # GET http://127.0.0.1:8000/sports/?order_by=name
        if request.GET.get("name") is not None:
            queryset = models.Sport.objects.filter(name=request.GET.get("name"))
        if request.GET.get("order_by") is not None:
            queryset = queryset.order_by(request.GET.get("order_by"))

        serializer = serializers.SportSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    # GET: http://127.0.0.1:8000/sports/id
    def retrieve(self, request, pk=None):
        try:
            sport = models.Sport.objects.get(pk=pk)
            serializer = serializers.SportSerializer(sport)
            return Response(serializer.data, status=200)

        except models.Sport.DoesNotExist:
            return Response({"error": "Sport does not exist"}, status=404)

    # ONLY POSSIBLE BY ADMIN USER
    # POST http://127.0.0.1:8000/sports/
    def create(self, request):
        # when the user is the admin, then allow the creation of a sport
        if request.user.is_superuser:
            sport = models.Sport.objects.create(
                name=request.data["name"],
                description=request.data["description"]
            )
            if request.data["image"]:
                sport.image = request.data["image"]
                sport.save()
            serializer = serializers.SportSerializer(sport)
            return Response(serializer.data, status=201)
        # otherwise return error
        else:
            return Response({"error": "user is not a superuser"}, status=401)

    # ONLY POSSIBLE BY ADMIN USER
    # PUT http://127.0.0.1:8000/sports/id
    def update(self, request, pk=None):
        # when the user is the admin, then allow the update of the sport
        if request.user.is_superuser:
            try:
                sport = models.Sport.objects.get(pk=pk)
                sport.name = request.data["name"]
                sport.description = request.data["description"]
                if request.data["image"]:
                    sport.image = request.data["image"]
                sport.save()
                serializer = serializers.SportSerializer(sport)
                return Response(serializer.data, status=200)
            except models.Sport.DoesNotExist:
                return Response({"error": "sport with this id does not exist"}, status=404)
        # otherwise return error
        else:
            return Response({"error": "user is not a superuser"}, status=401)

    # ONLY POSSIBLE BY ADMIN USER
    # DELETE http://127.0.0.1:8000/sports/id
    def destroy(self, request, pk=None):
        # when the user is the admin, then allow the deletion of the sport
        if request.user.is_superuser:
            models.Sport.objects.filter(pk=pk).delete()
            return Response(status=204)
        # otherwise return error
        else:
            return Response({"error": "user is not a superuser"}, status=401)

    def partial_update(self, request):
        # we do not allow partial updates here. so we return a 405 instead.
        return Response(status=405)

# Activity:
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
    # ALLOW ONLY WHEN LOGGEND IN:
    def create(self, request, format=None):
        if request.user.is_authenticated:
            activity = models.Activity.objects.create(
                title=request.data["title"],
                description=request.data["description"],
                date=request.data["date"],
                time=request.data["time"],
                min_players=request.data["min_players"],
                max_players=request.data["max_players"],
                equipment_needed=request.data["equipment_needed"],
                location=request.data["location"],
                sport_genre=models.Sport.objects.get(id=request.data["sport_genre"]),
                created_by_user=request.user
            )
            activity.participants.add(request.user)
            activity.save()
            serializer = serializers.ActivitySerializer(activity)
            return Response(serializer.data, status=200)
        else:
            return Response({"error": "login to create activity"}, status=401)

    # GET: http://127.0.0.1:8000/activities/id
    def retrieve(self, request, pk=None, format=None):
        try:
            activity = models.Activity.objects.get(pk=pk)
            serializer = serializers.ActivitySerializer2(activity)
            return Response(serializer.data, status=200)

        except models.Activity.DoesNotExist:
            return Response({"error": "activity does not exist"}, status=404)

    # PUT http://127.0.0.1:8000/activites/id
    # ALLOW ONLY WHEN LOGGEND IN AND THE USER WHO CREATED IT
    def update(self, request, pk=None, format=None):
        if request.user.is_authenticated:
            try:
                activity = models.Activity.objects.get(pk=pk)
                if request.user == activity.created_by_user:
                    activity.title = request.data["title"]
                    activity.sport_genre = models.Sport.objects.get(id=request.data["sport_genre"])
                    activity.description = request.data["description"]
                    activity.date = request.data["date"]
                    activity.time = request.data["time"]
                    activity.min_players = request.data["min_players"]
                    activity.max_players = request.data["max_players"]
                    activity.location = request.data["location"]
                    activity.equipment_needed = request.data["equipment_needed"]
                    activity.save()

                    return Response(
                        {
                        },
                        status=200
                    )
                else:
                    if request.user in activity.participants.all():
                        activity.participants.remove(request.user)
                        activity.save()
                    else:
                        activity.participants.add(request.user)
                        activity.save()

                        notification = models.Notification.objects.create(
                            from_user=request.user,
                            to_user=activity.created_by_user.id,
                            text="attends activity",
                            activity=activity
                        )

                    return Response(
                        {
                        },
                        status=200
                    )

            except models.Activity.DoesNotExist:
                return Response(status=404)
        else:
            return Response({"error": "login to create activity"}, status=401)


class CommentViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.Comment.objects.all()

    # GET: http://127.0.0.1:8000/comments/
    def list(self, request, format=None):
        queryset = models.Comment.objects.all()
        serializer = serializers.CommentSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

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

    #  POST http://127.0.0.1:8000/comments/
    def create(self, request, format=None):
        if request.user.is_authenticated:
            activity_x = models.Activity.objects.get(pk=request.data["activity"])
            comment = models.Comment.objects.create(
                created_at=datetime.now(),
                activity=activity_x,
                created_by_user=CustomUser.objects.get(pk=request.data["created_by_user"]),
                text=request.data["text"]
            )
            notification = models.Notification.objects.create(
                from_user=request.user,
                to_user=activity_x.created_by_user.id,
                text="commented on",
                activity=activity_x
            )

            return Response(
                {
                    "pk": comment.pk,
                    "text": comment.text
                },
                status=201
            )
        else:
            return Response({"error": "login to create comment"}, status=401)



# CustomUser
class UsersViewSet(viewsets.ViewSet):

    # GET: http://127.0.0.1:8000/users/
    def list(self, request, format=None):
        queryset = CustomUser.objects.all()
        serializer = serializers.UserSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    # GET: http://127.0.0.1:8000/users/pk
    def retrieve(self, request, pk=None, format=None):
        user = CustomUser.objects.get(pk=pk)
        serializer = serializers.UserSerializer(user)
        return Response(serializer.data, status=200)

    # POST: http://127.0.0.1:8000/users/
    def create(self, request):
        user = CustomUser.objects.create(
            username=request.data["username"],
            email=request.data["email"],
        )
        if request.data["first_name"] is not None:
            user.first_name = request.data["first_name"]
        if request.data["last_name"] is not None:
            user.last_name = request.data["last_name"]
        user.set_password(request.data["password"])
        user.save()
        return Response(
            {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name
            },
            status=201
        )

    def update(self, request, pk=None):
        user = CustomUser.objects.get(pk=pk)
        if request.user == user:
            user.first_name = request.data["first_name"]
            user.last_name = request.data["last_name"]
            if request.data["bio"] != "null": user.bio = request.data["bio"]
            if request.data["birthday"] != "null": user.birthday = request.data["birthday"]
            if request.data["profile_image"]: user.profile_image = request.data["profile_image"]
            if request.data["password"]: user.set_password(request.data["password"])
            user.save()

            return Response(
                {
                    "id": user.id,
                    "username": user.username,
                    "first_name": user.first_name,
                    "last_name": user.last_name
                },
                status=201
            )
        elif request.user in user.follower.all():
            user.follower.remove(request.user)
            user.save()

            return Response(
                {
                },
                status=200
            )
        elif request.user not in user.follower.all():
            user.follower.add(request.user)
            user.save()

            notification = models.Notification.objects.create(
                from_user=request.user,
                to_user=user.id,
                text="started following you."
            )
            return Response(
                {
                },
                status=200
            )

        return Response(
            {
            },
            status=200
        )


class NotificationViewSet(viewsets.ViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.Notification.objects.all()

    def list(self, request):
        queryset = models.Notification.objects.all()

        serializer = serializers.NotificationSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    def retrieve(self, request, pk=None, format=None):
        queryset = models.Notification.objects.filter(to_user=pk)
        serializer = serializers.NotificationSerializer(queryset, many=True)
        return Response(serializer.data, status=200)

    def update(self, request, pk=None):
        notification = models.Notification.objects.get(pk=pk)
        if request.user.id == notification.to_user:
            notification.read = True
            notification.save()
            return Response({"read": "true"}, status=200)
        else:
            return Response({"error": "tried to fetch data from other user"}, status=401)
