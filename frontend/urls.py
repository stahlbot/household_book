from django.urls import path
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('accounts', index),
    path('account/<str:id>', index),
    path('bookings', index),
    path('settings', index),
]
