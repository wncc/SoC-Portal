# Generated by Django 4.2.6 on 2024-03-30 10:31

import accounts.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('profile_picture', models.ImageField(blank=True, default='', upload_to=accounts.models.upload_to_location)),
                ('roll_number', models.CharField(error_messages={'unique': 'A user with that roll number already exists.'}, help_text='Required. 20 characters or fewer.', max_length=20, unique=True, verbose_name='roll number')),
                ('year', models.IntegerField(choices=[(1, 'First Year'), (2, 'Second Year'), (3, 'Third Year'), (4, 'Fourth Year'), (5, 'Fifth Year')], default=2)),
                ('department', models.CharField(blank=True, choices=[('Chemical Engineering', 'Chemical Engineering'), ('Mechanical Engineering', 'Mechanical Engineering'), ('Electrical Engineering', 'Electrical Engineering')], max_length=50, null=True)),
            ],
        ),
    ]
