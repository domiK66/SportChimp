# Generated by Django 3.2.10 on 2022-01-08 16:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sportapp', '0002_auto_20220108_1701'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='profile_image',
            field=models.ImageField(null=True, upload_to='profile_images/'),
        ),
    ]
