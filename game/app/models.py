from django.db import models


class Element(models.Model):
    name = models.CharField(max_length=255)
    value = models.IntegerField()

    def __str__(self):
        return self.name


class Stat(models.Model):
    login = models.CharField(max_length=128)
    result = models.IntegerField()

    def __str__(self):
        return self.login

