from rest_framework import serializers

from . import models
from django.contrib.auth.models import User


class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Sport
        fields = '__all__'


class FollowerSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.CustomUser
        fields = ('id', 'username', 'first_name', 'last_name', 'date_joined', 'birthday', 'bio', 'profile_image')


class UserSerializer(serializers.ModelSerializer):
    follower = FollowerSerializer(many=True)

    class Meta:
        model = models.CustomUser
        fields = ('id', 'username', 'first_name', 'last_name', 'date_joined', 'birthday', 'bio', 'profile_image', 'follower')


class ActivitySerializer(serializers.ModelSerializer):
    sport_genre = SportSerializer()
    created_by_user = UserSerializer()
    participants = UserSerializer(many=True)

    class Meta:
        model = models.Activity
        fields = '__all__'


class ActivitySerializer2(serializers.ModelSerializer):
    participants = UserSerializer(many=True)

    class Meta:
        model = models.Activity
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    created_by_user = UserSerializer()

    class Meta:
        model = models.Comment
        fields = '__all__'
