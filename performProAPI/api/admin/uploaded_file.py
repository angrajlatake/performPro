from django.contrib import admin
from django.shortcuts import redirect, render
from django.urls import path
from api.models import (
    UploadedFile,
    Employee,
    Province,
    LeaveType,
    LeaveEntitlement,
    LeaveRequest,
)
from api.forms import UploadFileForm
import csv
import logging

logger = logging.getLogger(__name__)


class UploadedFileAdmin(admin.ModelAdmin):
    form = UploadFileForm
    list_display = ("file_name", "created_at", "file_size", "user")

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            obj.user = request.user
        obj.file_size = obj.file.size
        super().save_model(request, obj, form, change)

    def get_readonly_fields(self, request, obj=None):
        if obj:
            return self.readonly_fields + ("user", "file_size")
        return self.readonly_fields

    @admin.action(description="Upload Employee data")
    def process_csv(self, request, queryset):
        for uploaded_file in queryset:
            with open(uploaded_file.file.path, newline="") as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    province = Province.objects.get(province=row["province"])
                    Employee.objects.update_or_create(
                        employee_id=row["employee_id"],
                        defaults={
                            "first_name": row["first_name"],
                            "last_name": row["last_name"],
                            "province": province,
                            "city": row["city"],
                            "date_of_joining": row["date_of_joining"],
                            "email": row["email"],
                            "phone_number": row["phone_number"],
                        },
                    )
                self.message_user(request, "CSV file processed successfully")

    @admin.action(description="Upload Province data")
    def upload_province(self, request, queryset):
        for uploaded_file in queryset:
            with open(uploaded_file.file.path, newline="") as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    Province.objects.update_or_create(
                        province=row["province"], abbreviation=row["abbreviation"]
                    )
                self.message_user(request, "CSV file processed successfully")

    @admin.action(description="Upload leaves types")
    def upload_leaves_types(self, request, queryset):
        for uploaded_file in queryset:
            with open(uploaded_file.file.path, newline="") as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    LeaveType.objects.update_or_create(
                        name=row["name"], description=row["description"]
                    )
                self.message_user(request, "CSV file processed successfully")

    @admin.action(description="Upload leave entitlements")
    def upload_leave_entitlements(self, request, queryset):
        for uploaded_file in queryset:
            with open(uploaded_file.file.path, newline="") as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    province = Province.objects.get(province=row["province"])
                    leave_type = LeaveType.objects.get(name=row["leave_type"])
                    duration_weeks = row["duration_weeks"]
                    duration_days = row["duration_days"]
                    monthly_increment = row["monthly_increment"]
                    paid = row["paid"]

                    # Convert empty strings to None or appropriate values
                    duration_weeks = float(duration_weeks) if duration_weeks else 0
                    duration_days = float(duration_days) if duration_days else None

                    LeaveEntitlement.objects.update_or_create(
                        province=province,
                        leave_type=leave_type,
                        defaults={
                            "duration_weeks": duration_weeks,
                            "duration_days": duration_days,
                            "monthly_increment": monthly_increment,
                            "paid": paid,
                        },
                    )
                self.message_user(request, "CSV file processed successfully")

    @admin.action(description="Upload Leave Requests")
    def upload_leave_requests(self, request, queryset):
        for uploaded_file in queryset:
            with open(uploaded_file.file.path, newline="") as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    employee = Employee.objects.get(employee_id=row["employee_id"])
                    leave_type = LeaveType.objects.get(name=row["leave_type"])
                    start_date = row["start_date"]
                    end_date = row["end_date"]
                    status = row["status"]
                    reason = row["reason"]
                    try:
                        LeaveRequest.objects.update_or_create(
                            employee=employee,
                            leave_type=leave_type,
                            start_date=start_date,
                            end_date=end_date,
                            status=status,
                            reason=reason,
                        )
                    except Exception as e:
                        print(e)
                        self.message_user(
                            request, f"Error: {e} for {row['employee_id']}"
                        )
                self.message_user(request, "CSV file processed successfully")

    actions = [
        process_csv,
        upload_province,
        upload_leaves_types,
        upload_leave_entitlements,
        upload_leave_requests,
    ]


admin.site.register(UploadedFile, UploadedFileAdmin)
