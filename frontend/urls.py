from django.urls import path
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('accounts', index),
    path('calender', index),
    path('settings', index),
]
