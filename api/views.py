from django.shortcuts import render

# Create your views here.
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Account, Booking
from .serializers import AccountSerializer, BookingSerializer, CreateAccountSerializer


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


class CreateAccount(APIView):
    # serializer_class = CreateAccountSerializer

    def post(self, request, format=None):
        print("saving new account")
        print(request.data)
        serializer = AccountSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            name = serializer.data.get('name')
            account = Account(name=name)
            account.save()
            return Response(AccountSerializer(account).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

