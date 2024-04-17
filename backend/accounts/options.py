from django.db import models



class DepartmentChoices(models.TextChoices):
    AEROSPACE_ENGINEERING = "Aerospace Engineering", "Aerospace Engineering"
    BIOSCIENCES_AND_BIOENGINEERING = "Biosciences and Bioengineering", "Biosciences and Bioengineering"
    CHEMICAL_ENGINEERING = "Chemical Engineering", "Chemical Engineering"
    CIVIL_ENGINEERING = "Civil Engineering", "Civil Engineering"
    COMPUTER_SCIENCE_AND_ENGINEERING = "Computer Science and Engineering", "Computer Science and Engineering"
    EARTH_SCIENCES = "Earth Sciences", "Earth Sciences"
    ELECTRICAL_ENGINEERING = "Electrical Engineering", "Electrical Engineering"
    ENERGY_SCIENCE_AND_ENGINEERING = "Energy Science and Engineering", "Energy Science and Engineering"
    ENGINEERING_PHYSICS = "Engineering Physics", "Engineering Physics"
    HUMANITIES_AND_SOCIAL_SCIENCES = "Humanities and Social Sciences", "Humanities and Social Sciences"
    INDUSTRIAL_DESIGN_CENTRE = "Industrial Design Centre", "Industrial Design Centre"
    MATHEMATICS = "Mathematics", "Mathematics"
    MECHANICAL_ENGINEERING = "Mechanical Engineering", "Mechanical Engineering"
    METALLURGICAL_ENGINEERING_AND_MATERIALS_SCIENCE = "Metallurgical Engineering and Materials Science", "Metallurgical Engineering and Materials Science"
    PHYSICS = "Physics", "Physics"


from django.db import models

class YearChoices(models.TextChoices):
    First_Year = "First Year", "First Year"
    Second_Year = "Second Year", "Second Year"
    Third_Year = "Third Year", "Third Year"
    Fourth_Year = "Fourth Year", "Fourth Year"
    Fifth_Year = "Fifth Year", "Fifth Year"
    M_Tech = "M.Tech", "M.Tech"
    Ph_D = "Ph.D.", "Ph.D."