from django.contrib import admin

from .models import Account
from .models import Booking

# Register your models here.

admin.site.register(Account)
admin.site.register(Booking)

