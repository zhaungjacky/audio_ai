# Generated by Django 4.2.6 on 2023-10-24 03:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_styletypes'),
    ]

    operations = [
        migrations.AddField(
            model_name='styletypes',
            name='importString',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
    ]