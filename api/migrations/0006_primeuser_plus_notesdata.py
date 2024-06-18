# Generated by Django 4.2.6 on 2023-10-23 18:30

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_primehtmlcontent_cssstyles_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='primeuser',
            name='plus',
            field=models.BooleanField(default=False),
        ),
        migrations.CreateModel(
            name='NotesData',
            fields=[
                ('originalNotes', models.TextField(default='defalute notes', max_length=100000)),
                ('transcriptNotes', models.TextField(default='defalute transcriptNotes', max_length=100000)),
                ('rewriteNotes', models.TextField(default='defalute rewriteNotes', max_length=100000)),
                ('tag_0', models.CharField(blank=True, max_length=100)),
                ('tag_1', models.CharField(blank=True, max_length=100)),
                ('tag_2', models.CharField(blank=True, max_length=100)),
                ('tag_3', models.CharField(blank=True, max_length=100)),
                ('tag_4', models.CharField(blank=True, max_length=100)),
                ('tag_5', models.CharField(blank=True, max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('userStatus', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.primeuser')),
            ],
        ),
    ]