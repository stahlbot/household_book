from django.shortcuts import render

# Create your views here.
from rest_framework import generics

from .models import Account, Booking
from .serializers import AccountSerializer, BookingSerializer


class AccountView(generics.ListAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class BookingView(generics.ListAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
