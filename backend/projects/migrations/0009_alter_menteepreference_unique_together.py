# Generated by Django 4.2.6 on 2024-04-12 03:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0008_rename_ordering_menteepreference_preference_and_more'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='menteepreference',
            unique_together={('mentee', 'project'), ('mentee', 'project', 'preference')},
        ),
    ]
