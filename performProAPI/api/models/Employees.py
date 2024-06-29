from django.db import models
from django.contrib.auth.models import User
from .Provinces import Province


# Create your models here.
class Employee(models.Model):
    user = models.OneToOneField(
        User, null=True, blank=True, on_delete=models.DO_NOTHING
    )
    employee_id = models.CharField(max_length=100, unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    province = models.ForeignKey(
        Province, null=True, blank=True, on_delete=models.SET_NULL
    )
    city = models.CharField(max_length=100)
    date_of_joining = models.DateField()
    email = models.EmailField(max_length=100, unique=True, null=True)
    phone_number = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.first_name + " " + self.last_name
