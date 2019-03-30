from django.urls import path,include,reverse
from . import views 
from rest_framework import routers 

router = routers.DefaultRouter()
router.register('species', views.SpeciesView)
# router.register('series', views.SeriesView)
# router.register('events', views.EventView)

urlpatterns = [
    path('', include(router.urls)),
]
