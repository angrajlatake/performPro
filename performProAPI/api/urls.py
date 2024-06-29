from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_employees, name='index'),
    # path('api/<int:id>', views.api, name='api'),
    # path('api/<int:id>/<int:page>', views.api, name='api'),
]