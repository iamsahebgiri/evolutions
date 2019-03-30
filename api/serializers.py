from .models import Species, Series, Event
from rest_framework import serializers


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class SeriesSerializer(serializers.ModelSerializer):
    event = EventSerializer(many=True)

    class Meta:
        model = Series
        fields = '__all__'


class SpeciesSerializer(serializers.ModelSerializer):
    series = SeriesSerializer(many=True)

    class Meta:
        model = Species
        fields = '__all__'
