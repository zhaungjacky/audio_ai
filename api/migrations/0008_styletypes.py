# Generated by Django 4.2.6 on 2023-10-24 03:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_rename_svip_primeuser_svip_rename_vip_primeuser_vip'),
    ]

    operations = [
        migrations.CreateModel(
            name='StyleTypes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='', max_length=100)),
                ('context', models.TextField(blank=True, default='', max_length=1000)),
                ('icon', models.TextField(blank=True, default='', max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
