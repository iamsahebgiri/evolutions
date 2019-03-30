from django.shortcuts import render
from rest_framework import viewsets
from .models import Species, Series , Event
from .serializers import SpeciesSerializer,SeriesSerializer,EventSerializer

class SpeciesView(viewsets.ModelViewSet):
    queryset = Species.objects.all()
    serializer_class = SpeciesSerializer


class SeriesView(viewsets.ModelViewSet) :
    queryset = Series.objects.all()
    serializer_class = SeriesSerializer

class EventView(viewsets.ModelViewSet) :
    queryset = Event.objects.all()
    serializer_class = EventSerializer