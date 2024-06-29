from django.contrib import admin
from api.models import Employee
from django.contrib.auth.models import User


@admin.action(description="Create User for selected Employee")
def create_user(modeladmin, request, queryset):
    for employee in queryset:
        if not employee.user:
            user = User.objects.create_user(
                username=employee.employee_id,
                first_name=employee.first_name,
                last_name=employee.last_name,
                email=employee.email,
                password="123456",
            )
            employee.user = user
            employee.save()
        else:
            modeladmin.message_user(request, "User already exists for this employee")


class EmployeeAdmin(admin.ModelAdmin):
    list_display = (
        "employee_id",
        "first_name",
        "last_name",
        "province",
        "city",
        "date_of_joining",
        "email",
        "phone_number",
        "is_active",
        "user",
    )
    search_fields = (
        "employee_id",
        "first_name",
        "last_name",
        "province",
        "city",
        "date_of_joining",
        "email",
        "phone_number",
    )
    list_filter = ("is_active",)
    actions = [create_user]


admin.site.register(Employee, EmployeeAdmin)
