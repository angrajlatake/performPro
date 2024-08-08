from django.contrib import admin
from api.models import Schedule, ScheduleStatus
from api.utils.leaves import update_schedule_status


class ScheduleAdmin(admin.ModelAdmin):
    list_display = (
        "employee",
        "date",
        "shift_start_time",
        "shift_end_time",
    )

    list_filter = ("date", "employee")

    @admin.action(description="Update schedule status")
    def update_schedule_status(self, request, queryset):
        update_schedule_status()
        self.message_user(request, "Schedule status updated successfully")

    actions = [update_schedule_status]


class ScheduleStatusAdmin(admin.ModelAdmin):
    list_display = ("schedule_date", "start_time", "end_time", "status")

    def schedule_date(self, obj):
        return obj.schedule.date

    def start_time(self, obj):
        return obj.schedule.shift_start_time

    def end_time(self, obj):
        return obj.schedule.shift_end_time


admin.site.register(Schedule, ScheduleAdmin)
admin.site.register(ScheduleStatus, ScheduleStatusAdmin)
