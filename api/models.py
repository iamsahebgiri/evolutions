from django.db import models
from datetime import datetime

class Species(models.Model):
    name = models.CharField(max_length=40)
    avatar = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=60)
    total_event_count = models.IntegerField()
    date_added = models.DateField("Date Added",default=datetime.now)

    class Meta:
        verbose_name_plural = "Species"
    def __str__(self):
        return self.name

class Series(models.Model):
    name = models.CharField(max_length=50)
    species = models.ForeignKey(Species,related_name='series',default=1,on_delete=models.SET_DEFAULT)

    class Meta:
        verbose_name_plural = "Series"

    def __str__(self):
        return self.name

class Event(models.Model):
    title = models.CharField(max_length=50)
    date = models.IntegerField()
    description = models.TextField()
    imgURL = models.CharField(max_length=200)
    series = models.ForeignKey(Series,related_name='event',default=1,on_delete= models.SET_DEFAULT)

    class Meta:
        verbose_name_plural = "Events"
    def __str__(self):
        return self.title
