from django.http import JsonResponse, Http404
from django.shortcuts import render

# Create your views here.

from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Account, Booking
from .serializers import *


class AccountView(generics.ListAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class BookingView(generics.ListAPIView):
    queryset = Booking.objects.all()
    serializer_class = CreateBookingSerializer


class GetAccounts(APIView):
    serializer_class = AccountSerializer

    def get(self, request, format=None):
        accounts = Account.objects.all()
        data = AccountSerializer(accounts, many=True).data
        print(data)
        for i, account in enumerate(data):
            account['balance'] = accounts[i].calc_account_balance()
        return Response(data, status=status.HTTP_200_OK)


class CreateAccount(APIView):

    def post(self, request, format=None):
        print("saving new account")
        print(request.data)
        serializer = AccountSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            name = serializer.data.get('name')
            account_type = serializer.data.get('account_type')
            account = Account(name=name, account_type=account_type)
            account.save()
            return Response(AccountSerializer(account).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class AccountDetail(APIView):
    def get_object(self, pk):
        try:
            return Account.objects.get(pk=pk)
        except Account.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        account = self.get_object(pk)
        data = AccountSerializer(account).data
        bookings = account.get_bookings()
        bookings_serialized = GetBookingsSerializer(bookings, many=True).data
        data['bookings'] = bookings_serialized
        data['balance'] = account.calc_account_balance()
        return Response(data, status=status.HTTP_200_OK)

    def delete(self, request, pk, format=None):
        account = self.get_object(pk)
        account.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def patch(self, request, pk, format=None):
        account = self.get_object(pk)
        serializer = AccountSerializer(account, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateBooking(APIView):
    def post(self, request, format=None):
        serializer = CreateBookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            # modify the response data in such way that not only the primary key of an account is sent
            response = serializer.data
            off_acc = Account.objects.filter(pk=response['offsetting_account']).first()
            acc = Account.objects.filter(pk=response['account']).first()
            # response['offsetting_account'] = AccountSerializer(off_acc).data
            # response['account'] = AccountSerializer(acc).data

            return Response(response, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class BookingList(APIView):
    def get(self, request, format=None):
        bookings = Booking.objects.all()
        serializer = GetBookingsSerializer(bookings, many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BookingDetail(APIView):
    def get_object(self, pk):
        try:
            return Booking.objects.get(pk=pk)
        except Booking.DoesNotExist:
            raise Http404

    def delete(self, request, pk, format=None):
        booking = self.get_object(pk)
        booking.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def patch(self, request, pk, format=None):
        booking = self.get_object(pk)
        serializer = CreateBookingSerializer(booking, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
