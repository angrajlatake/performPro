from rest_framework import serializers
from api.models import Schedule, Employee


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = [
            "id",
            "date",
            "shift_start_time",
            "shift_end_time",
            "break_1_start_time",
            "break_1_end_time",
            "lunch_start_time",
            "lunch_end_time",
            "break_2_start_time",
            "break_2_end_time",
        ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.shift_start_time:
            representation["shift_start_time"] = instance.shift_start_time.strftime(
                "%H:%M"
            )
        if instance.shift_end_time:
            representation["shift_end_time"] = instance.shift_end_time.strftime("%H:%M")
        return representation


class EmployeeScheduleSerializer(serializers.ModelSerializer):
    schedules = ScheduleSerializer(many=True, read_only=True)

    class Meta:
        model = Employee
        fields = [
            "id",
            "first_name",
            "last_name",
            "province",
            "date_of_joining",
            "email",
            "phone_number",
            "schedules",
        ]
