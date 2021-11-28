from django.contrib import admin
from . import models
# Register your models here.
class EventAdmin(admin.ModelAdmin):
    pass

class SportAdmin(admin.ModelAdmin):
    pass

admin.site.register(models.Event, EventAdmin)
admin.site.register(models.Sport, SportAdmin)