# Generated by Django 3.0.5 on 2020-11-15 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0018_biog'),
    ]

    operations = [
        migrations.AlterField(
            model_name='release',
            name='release_date',
            field=models.DateField(null=True),
        ),
    ]
