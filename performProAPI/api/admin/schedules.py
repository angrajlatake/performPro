from django.contrib import admin
from api.models import Schedule


class ScheduleAdmin(admin.ModelAdmin):
    list_display = ("employee", "date", "shift_start_time", "shift_end_time")
    list_filter = ("date", "employee")


admin.site.register(Schedule, ScheduleAdmin)
