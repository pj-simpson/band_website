# Generated by Django 3.0.5 on 2020-10-28 16:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0014_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='image',
            old_name='image',
            new_name='src',
        ),
        migrations.AddField(
            model_name='image',
            name='height',
            field=models.IntegerField(default=2),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='image',
            name='width',
            field=models.IntegerField(default=3),
            preserve_default=False,
        ),
    ]
