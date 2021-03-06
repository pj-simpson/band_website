# Generated by Django 3.0.5 on 2020-08-05 19:54

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0007_release'),
    ]

    operations = [
        migrations.AlterField(
            model_name='release',
            name='format',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(choices=[('DL', 'DL'), ('LP', 'LP'), ('CS', 'CS'), ('CD', 'CD')], default='DL', max_length=2), size=None),
        ),
    ]
