from django.contrib import admin
from api.models import (
    LeaveType,
    LeaveEntitlement,
    EmployeeLeaveQuota,
    LeaveRequest,
)
from api.utils.leaves import update_employee_leave_quota


class EmployeeLeaveAdmin(admin.ModelAdmin):
    list_display = ("employee", "leave_type", "current_balance", "last_increment_date")

    @admin.action(description="Update employee leave quota")
    def update_leave_quote(self, request, queryset):
        update_employee_leave_quota()
        self.message_user(request, "Leave quota updated successfully")

    actions = [update_leave_quote]


admin.site.register(LeaveType)
admin.site.register(LeaveEntitlement)
admin.site.register(EmployeeLeaveQuota, EmployeeLeaveAdmin)
admin.site.register(LeaveRequest)
