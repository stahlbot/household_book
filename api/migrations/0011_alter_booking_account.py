# Generated by Django 3.2.7 on 2021-09-19 15:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_auto_20210919_1723'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='account',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='account', to='api.account'),
        ),
    ]
