from rest_framework import serializers, fields
from .models import *


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'name', 'created_at', 'account_type', 'get_account_type_display')


class CreateBookingSerializer(serializers.ModelSerializer):
    offsetting_account = serializers.PrimaryKeyRelatedField(queryset=Account.objects.all())
    account = serializers.PrimaryKeyRelatedField(queryset=Account.objects.all())
    date = fields.DateField(input_formats=['%Y-%m-%d'])

    class Meta:
        model = Booking
        fields = ('amount', 'offsetting_account', 'date', 'account', 'text')


class GetBookingsSerializer(serializers.ModelSerializer):
    offsetting_account = AccountSerializer(read_only=True)
    account = AccountSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = ('amount', 'offsetting_account', 'date', 'account', 'text')
