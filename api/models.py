import datetime

from django.db import models
from django.utils import timezone


# Create your models here.


class Booking(models.Model):
    amount = models.FloatField(null=False)
    offsetting_account = models.ForeignKey("Account", models.CASCADE, null=False, related_name="offsetting_account")
    date = models.DateField(null=False, default=timezone.now().date())
    account = models.ForeignKey("Account", models.CASCADE, null=False)
    text = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)


class Account(models.Model):
    name = models.CharField(max_length=50, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    bookings = models.ManyToManyField("self", through=Booking, symmetrical=False)

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
