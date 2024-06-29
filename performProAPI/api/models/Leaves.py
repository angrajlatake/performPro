from django.db import models
from django.utils import timezone
from datetime import datetime

from .Provinces import Province
from .Employees import Employee


class LeaveType(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class LeaveEntitlement(models.Model):
    province = models.ForeignKey(Province, on_delete=models.CASCADE)
    leave_type = models.ForeignKey(LeaveType, on_delete=models.CASCADE)
    duration_weeks = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    duration_days = models.IntegerField(null=True, blank=True)
    monthly_increment = models.BooleanField(default=False)
    paid = models.BooleanField(default=False)

    class Meta:
        unique_together = ("province", "leave_type")

    def __str__(self):
        return f"{self.leave_type} in {self.province}"


class EmployeeLeaveQuota(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    leave_type = models.ForeignKey(LeaveType, on_delete=models.CASCADE)
    current_balance = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    last_increment_date = models.DateTimeField(auto_now_add=True)

    def increment_leave(self):
        today = timezone.now().date()
        joining_day = self.employee.date_of_joining.day

        # Check if today is greater than or equal to the joining day
        if today.day >= joining_day:
            if self.last_increment_date < today.replace(day=1):
                months_diff = (
                    (today.year - self.last_increment_date.year) * 12
                    + today.month
                    - self.last_increment_date.month
                )
                entitlement = LeaveEntitlement.objects.get(
                    province=self.employee.province, leave_type=self.leave_type
                )
                self.current_balance += entitlement.monthly_increment * months_diff
                self.last_increment_date = today
                self.save()

    def __str__(self):
        return f"{self.employee} - {self.leave_type}"


class LeaveRequest(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    leave_type = models.ForeignKey(LeaveType, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(
        max_length=20,
        choices=[
            ("Pending", "Pending"),
            ("Approved", "Approved"),
            ("Rejected", "Rejected"),
        ],
    )
    reason = models.TextField(blank=True)

    def __str__(self):
        return f"{self.leave_type} request by {self.employee}"

    @property
    def duration(self):
        return (self.end_date - self.start_date).days + 1
