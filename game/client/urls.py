from django.conf.urls import url

from game.client import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^play', views.play, name='play'),
    url(r'^registration', views.registration, name='registration')
]
