# management/commands/import_data.py

import csv
from django.core.management.base import BaseCommand
from projects.models import Project
import pandas as pd

class Command(BaseCommand):
    help = 'Import data from CSV file to database'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='The path to the CSV file')

    def handle(self, *args, **kwargs):
        csv_file = kwargs['csv_file']
        df = pd.read_csv(csv_file)
        for index, row in df.iterrows():
            if(Project.objects.filter(title=row['title'], description=row['description']).exists()):
                print(f"Project {row['title']} already exists")
                continue
            project = Project(
                title=row['title'],
                description=row['description'],
                checkpoints=row['checkpoints'],
                timeline=row['timeline'],
                mentor=row['mentor'],
                co_mentor_info=row['co_mentor_info'],
                specific_category=row['specific_category'],
                general_category=row['general_category'],
                mentee_max=row['mentee_max'],
                prereuisites=row['prereuisites'],
                banner_image=row['banner_image'],
            )
            project.save()

        print("Done and Dusted")
        return
        
