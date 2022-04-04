from django.urls import path, include
from .views import *

urlpatterns = [
    path('accounts', AccountList.as_view()),
    path('accounts/<int:pk>', AccountDetail.as_view()),
    path('bookings', BookingList.as_view()),
    path('bookings/<int:pk>', BookingDetail.as_view()),
]
