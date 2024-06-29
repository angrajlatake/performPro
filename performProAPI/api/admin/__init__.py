from django.contrib import admin
from api.models import Province
from .employees import EmployeeAdmin
from .leaves import *
from .uploaded_file import *

admin.site.site_header = "PerformPro"
admin.site.site_title = "PerformPro"
admin.site.register(Province)
