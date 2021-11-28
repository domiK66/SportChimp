from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('events', views.EventViewSet, basename = "events")
router.register('sports', views.SportViewSet, basename = "sports")