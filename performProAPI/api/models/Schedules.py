from django.db import models
from django.utils import timezone
from .Employees import Employee


class Schedule(models.Model):
    employee = models.ForeignKey("Employee", on_delete=models.DO_NOTHING)
    date = models.DateField()
    shift_start_time = models.TimeField()
    shift_end_time = models.TimeField()
    break_1_start_time = models.TimeField(null=True, blank=True)
    break_1_end_time = models.TimeField(null=True, blank=True)
    lunch_start_time = models.TimeField(null=True, blank=True)
    lunch_end_time = models.TimeField(null=True, blank=True)
    break_2_start_time = models.TimeField(null=True, blank=True)
    break_2_end_time = models.TimeField(null=True, blank=True)
