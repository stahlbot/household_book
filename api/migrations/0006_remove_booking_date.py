# Generated by Django 3.2.7 on 2021-09-16 13:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_remove_account_account_type_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='date',
        ),
    ]
