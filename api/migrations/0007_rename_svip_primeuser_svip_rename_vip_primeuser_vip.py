# Generated by Django 4.2.6 on 2023-10-23 18:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_primeuser_plus_notesdata'),
    ]

    operations = [
        migrations.RenameField(
            model_name='primeuser',
            old_name='Svip',
            new_name='svip',
        ),
        migrations.RenameField(
            model_name='primeuser',
            old_name='Vip',
            new_name='vip',
        ),
    ]