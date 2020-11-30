from django.urls import path

from backend.views import *

urlpatterns = [
    path('api/create/info=<str:info>/', create_record),
    path('api/employeesList/', get_record),
    path('api/getEmployees/', get_record_all),
    path('api/emp_no=<int:emp_no>/', get_record_single),
    path('api/update/info=<str:info>/', update_record),
    path('api/delete/emp_no=<int:emp_no>/', delete_record),
]