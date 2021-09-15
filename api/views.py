from django.http import JsonResponse, Http404
from django.shortcuts import render

# Create your views here.

from rest_framework import generics, status
from rest_framework.decorators import api_view
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
