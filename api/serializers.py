from rest_framework import serializers
from .models import *


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'name', 'created_at', 'account_type', 'get_account_type_display')


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('id', 'amount', 'offsetting_account', 'date', 'account', 'text', 'created_at')
