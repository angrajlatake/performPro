from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from api.models import Schedule, Employee, ScheduleStatus
from api.serializers import EmployeeScheduleSerializer
from django.db.models import Prefetch


class FilterSchedules(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, format=None):
        from_date = request.query_params.get("from_date")
        to_date = request.query_params.get("to_date")
        if not from_date or not to_date:
            return Response(
                {"error": "Please provide both from_date and to_date"}, status=400
            )
        schedules = Schedule.objects.filter(
            date__range=[from_date, to_date]
        ).select_related("schedule_status")
        employees = Employee.objects.prefetch_related(
            Prefetch(
                "schedule_set",
                queryset=schedules,
                to_attr="schedules",
            )
        )
        serializer = EmployeeScheduleSerializer(employees, many=True)
        return Response(serializer.data)


class FilterEmployeeSchedule(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, format=None):
        employee_id = request.query_params.get("employee_id")
        from_date = request.query_params.get("from_date")
        to_date = request.query_params.get("to_date")
        if not employee_id or not from_date or not to_date:
            return Response(
                {"error": "Please provide employee_id, from_date, and to_date"},
                status=400,
            )

        schedules = Schedule.objects.filter(
            employee_id=employee_id, date__range=[from_date, to_date]
        )
        employees = Employee.objects.filter(id=employee_id).prefetch_related(
            Prefetch("schedule_set", queryset=schedules, to_attr="schedules")
        )
        serializer = EmployeeScheduleSerializer(employees, many=True)
        return Response(serializer.data)
