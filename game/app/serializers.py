from rest_framework import serializers

from game.app.models import Element, Stat


class ElementSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Element
        fields = ('name', 'value')


class StatSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Stat
        fields = ('login', 'result')
