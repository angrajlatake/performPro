from rest_framework import serializers
from api.models import Employee
from api.models import Province


class ProvinceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Province
        fields = [
            "id",
            "province",
            "abbreviation",
        ]


class EmployeeSerializer(serializers.ModelSerializer):
    province = ProvinceSerializer(read_only=True)

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
