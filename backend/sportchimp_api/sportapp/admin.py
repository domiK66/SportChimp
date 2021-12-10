from django.contrib import admin
from . import models


#
class SportAdmin(admin.ModelAdmin):
    pass


admin.site.register(models.Sport, SportAdmin)


#
class ActivityAdmin(admin.ModelAdmin):
    pass


admin.site.register(models.Activity, ActivityAdmin)


#
class CommentAdmin(admin.ModelAdmin):
    pass


admin.site.register(models.Comment, CommentAdmin)


#
class FriendAdmin(admin.ModelAdmin):
    pass


admin.site.register(models.Friend, FriendAdmin)


#
class FriendshipRequestAdmin(admin.ModelAdmin):
    pass


admin.site.register(models.FriendshipRequest, FriendshipRequestAdmin)
