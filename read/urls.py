from django.urls import path
from . import views

urlpatterns = [
    path('', views.index , name="index" ),
    path('add', views.add, name="add"),
    path('details/<int:id>', views.details, name="details"),
    path('delete/<int:id>', views.destroy),
    path('success', views.success, name="success"),
]
