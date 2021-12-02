from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('activities', views.ActivityViewSet, basename = "activity")
router.register('sports', views.SportViewSet, basename = "sports")
router.register('comments', views.CommentViewSet, basename = "comment")