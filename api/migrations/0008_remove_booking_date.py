# Generated by Django 3.2.7 on 2021-09-16 13:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_booking_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='date',
        ),
    ]
