# Generated by Django 4.2.6 on 2023-11-07 07:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('voice', '0006_alter_uploadedfile_file'),
    ]

    operations = [
        migrations.AddField(
            model_name='uploadedfile',
            name='file_name',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='uploadedfile',
            name='description',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
