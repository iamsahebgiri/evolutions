from django.shortcuts import render
from django.http import HttpResponse
from api.models import Species

# Create your views here.
def homepage(request):
    return render(request,'home/index.html')
def play(request):
    return render(request, 'home/play.html' )