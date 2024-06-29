# Generated by Django 4.2.13 on 2024-06-28 14:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_employee_email_employee_employee_id_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Province',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('province', models.CharField(max_length=100, unique=True)),
                ('abbreviation', models.CharField(max_length=100)),
            ],
        ),
    ]
