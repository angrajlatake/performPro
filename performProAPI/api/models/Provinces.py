from django.db import models


class Province(models.Model):
    province = models.CharField(max_length=100)
    abbreviation = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.abbreviation
