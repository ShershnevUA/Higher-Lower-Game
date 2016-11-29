from rest_framework import viewsets
from game.app.models import Element, Stat
from game.app.serializers import ElementSerializers, StatSerializers


class ElementViewSet(viewsets.ModelViewSet):
    queryset = Element.objects.all().order_by('name')
    serializer_class = ElementSerializers


class StatViewSet(viewsets.ModelViewSet):
    queryset = Stat.objects.all().order_by('result').reverse()
    serializer_class = StatSerializers

