from django.contrib import admin
from . import models
# Register your models here.
class ActivityAdmin(admin.ModelAdmin):
    pass

class SportAdmin(admin.ModelAdmin):
    pass

admin.site.register(models.Activity, ActivityAdmin)
admin.site.register(models.Sport, SportAdmin)
