from django.urls import path, include
from .views import AccountView, BookingView

urlpatterns = [
    path('account', AccountView.as_view()),
    path('booking', BookingView.as_view()),
]
