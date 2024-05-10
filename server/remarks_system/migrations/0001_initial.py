# Generated by Django 5.0.1 on 2024-04-24 08:11

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('video_system', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Remark',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('video', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='remarks', to='video_system.video')),
            ],
        ),
    ]