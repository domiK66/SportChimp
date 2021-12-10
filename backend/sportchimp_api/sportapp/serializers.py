from rest_framework import serializers

from . import models
from django.contrib.auth.models import User


class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Sport
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name')


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Activity
        fields = '__all__'

    sport_genre = SportSerializer()
    participants = UserSerializer(many=True)
    created_by_user = UserSerializer()

