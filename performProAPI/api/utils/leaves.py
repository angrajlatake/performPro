from django.utils import timezone
from api.models import (
    Employee,
    LeaveType,
    LeaveEntitlement,
    EmployeeLeaveQuota,
    Schedule,
    LeaveRequest,
    ScheduleStatus,
)


def calculate_completed_months(joining_date, current_date):
    """
    Calculate the number of complete months an employee has worked since their joining date.

    :param joining_date: datetime.date object representing the employee's joining date
    :param current_date: datetime.date object representing the current date
    :return: int, number of complete months
    """
    # Calculate the difference in years and months
    years_difference = current_date.year - joining_date.year
    months_difference = current_date.month - joining_date.month

    # Total months considering the difference in years and months
    total_months = years_difference * 12 + months_difference

    # Adjust the calculation if the current day is before the joining day
    if current_date.day < joining_date.day:
        total_months -= 1

    return total_months


def calculate_leave_balance(employee):
    pass


def update_employee_leave_quota():
    employees = Employee.objects.all()
    for employee in employees:
        province = employee.province
        leave_entitlements = LeaveEntitlement.objects.filter(province=province)

        for entitlement in leave_entitlements:
            leave_type = entitlement.leave_type
            total_duration_days = 0
            if entitlement.monthly_increment:
                total_allowed_days = (entitlement.duration_weeks * 7) + (
                    entitlement.duration_days or 0
                )
                monthly_increment_value = total_allowed_days / 12
                total_duration_days = (
                    monthly_increment_value
                    * calculate_completed_months(
                        employee.date_of_joining, timezone.now().date()
                    )
                )
            else:
                total_duration_days = entitlement.duration_weeks * 7

            employee_leave_quota, created = EmployeeLeaveQuota.objects.get_or_create(
                employee=employee,
                leave_type=leave_type,
                current_balance=total_duration_days,
                last_increment_date=timezone.now(),
            )

            if not created:
                employee_leave_quota.current_balance = total_duration_days
                employee_leave_quota.last_increment_date = timezone.now()
                employee_leave_quota.save()


def update_schedule_status():
    schedules = Schedule.objects.all()
    for schedule in schedules:
        employee = schedule.employee
        # get all leave request that are approved for the employee
        leave_requests = LeaveRequest.objects.filter(
            employee=employee, status="Approved"
        )
        # check if there is a leave request for the current schedule, if so, set the status to LOA, else set it to scheduled
        if leave_requests.filter(
            start_date=schedule.date, end_date=schedule.date
        ).exists():
            ScheduleStatus.objects.update_or_create(schedule=schedule, status="LOA")

        else:
            ScheduleStatus.objects.update_or_create(
                schedule=schedule, status="Scheduled"
            )
