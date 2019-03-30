from django.contrib import admin
from . models import Species, Series, Event

# Register your models here.
admin.site.register(Species)
admin.site.register(Series)
admin.site.register(Event)