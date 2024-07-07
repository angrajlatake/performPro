from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from api.models import Employee
from api.serializers import EmployeeSerializer


class EmployeesList(APIView):

    def get_queryset(self):
        return Employee.objects.all()

    def get(self, request, format=None):
        queryset = self.get_queryset()
        serializer = EmployeeSerializer(queryset, many=True)
        return Response(serializer.data)
