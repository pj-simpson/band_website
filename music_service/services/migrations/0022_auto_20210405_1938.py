# Generated by Django 3.0.12 on 2021-04-05 19:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0021_auto_20201229_1614'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='image',
            name='title',
        ),
        migrations.AddField(
            model_name='image',
            name='credit',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
