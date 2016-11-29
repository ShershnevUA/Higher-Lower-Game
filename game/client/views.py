from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return render(request, 'client/index.html')


def play(request):
    return render(request, 'client/play.html')


def registration(request):
    return render(request, 'client/registration.html')

