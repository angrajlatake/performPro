from rest_framework import serializers
from api.models import Employee


class EmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee
        fields = [
            "first_name",
            "last_name",
            "province",
            "city",
            "date_of_joining",
            "email",
        ]
