# Generated by Django 5.0.6 on 2024-05-15 23:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('applications', '0003_alter_application_dateapplied'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='application',
            name='status',
        ),
    ]
