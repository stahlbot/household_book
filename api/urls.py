from django.urls import path, include
from .views import *

urlpatterns = [
    path('account', AccountView.as_view()),
    path('booking', BookingView.as_view()),
    path('get-accounts', GetAccounts.as_view()),
    path('create-account', CreateAccount.as_view()),
    path('account/<int:pk>', AccountDetail.as_view()),
    path('create-booking', CreateBooking.as_view()),
    path('bookings', BookingList.as_view()),
    path('booking/<int:pk>', AccountDetail.as_view()),

]
