from django.urls import path
from api.views import auth, employees

urlpatterns = [
    path("jwt/create/", auth.CustomTokenObtainPairView.as_view()),
    path("jwt/refresh/", auth.CustomTokenRefreshView.as_view()),
    path("jwt/verify/", auth.CustomTokenVerifyView.as_view()),
    path("logout/", auth.LogoutView.as_view()),
    path("employees/", employees.EmployeesList.as_view()),
]
