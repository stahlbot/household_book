from django.shortcuts import render

# Create your views here.
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Account, Booking
from .serializers import AccountSerializer, BookingSerializer


class AccountView(generics.ListAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class BookingView(generics.ListAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


class GetAccounts(APIView):
    serializer_class = AccountSerializer

    def get(self, request, format=None):
        accounts = Account.objects.all()
        data = AccountSerializer(accounts, many=True).data
        print(data)
        return Response(data, status=status.HTTP_200_OK)
