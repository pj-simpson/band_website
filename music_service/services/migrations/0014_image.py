# Generated by Django 3.0.5 on 2020-10-28 15:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0013_homeimage_created_date'),
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, upload_to='image_gallery_images/')),
                ('created_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
