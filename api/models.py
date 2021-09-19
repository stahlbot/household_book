import datetime

from django.db import models
from django.utils import timezone
from django.db.models import Sum



# Create your models here.


class Booking(models.Model):
    amount = models.FloatField(null=False)
    offsetting_account = models.ForeignKey("Account", models.CASCADE, null=False, related_name="offsetting_account")
    date = models.DateField(null=False, default=timezone.now().date())
    account = models.ForeignKey("Account", models.CASCADE, null=False)
    text = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'offacc {self.offsetting_account} acc {self.account} text {self.text}'


class Account(models.Model):
    name = models.CharField(max_length=50, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    bookings = models.ManyToManyField("self", through=Booking, symmetrical=True)

    ASSET = "AS"
    LIABILITY = "LI"
    EARNING = "EA"
    EXPENSE = "EX"
    TYPE_CHOICES = [
        (ASSET, "Asset"),
        (LIABILITY, "Liability"),
        (EARNING, "Earning"),
        (EXPENSE, "Expense")
    ]
    account_type = models.CharField(
        max_length=2,
        choices=TYPE_CHOICES,
        default=ASSET
    )

    def __str__(self):
        return self.name

    def get_bookings(self):
        return Booking.objects.filter(account=self.id) | Booking.objects.filter(offsetting_account=self.id)

    def calc_account_balance(self):
        bookings = self.get_bookings()

        bookings_this_account = bookings.filter(account=self.id)
        bookings_offsetting_account = bookings.filter(offsetting_account=self.id)

        bookings_this_account_sum = bookings_this_account.aggregate(Sum('amount'))['amount__sum']
        bookings_offsetting_account_sum = bookings_offsetting_account.aggregate(Sum('amount'))['amount__sum']

        if bookings_offsetting_account_sum is None:
            bookings_offsetting_account_sum = 0

        if bookings_this_account_sum is None:
            bookings_this_account_sum = 0

        return bookings_this_account_sum - bookings_offsetting_account_sum
