from accounts.models import User
from accounts.tests import get_full_user_data
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Season


class ProjectSubmissionTest(APITestCase):
    project_submission_url = reverse("dashboard:mentor_submit")
    project_data = {
        "title": "Project",
        "category": "AIML",
        "mentee_max": 8,
        "abstract": (
            "A small abstract is a succinct summary capturing the main points of a document, "
            + "providing a quick glimpse into its essential content without the need for an in-depth exploration."
        ),
        "description": (
            "Description is a comprehensive representation of the characteristics, features, or qualities of "
            + "something. In various contexts, it serves as a detailed account that conveys essential information, "
            + "context, or attributes. Descriptions are commonly employed in writing, communication, and documentation "
            + "to provide clarity and understanding. They play a crucial role in conveying the nuances and details of "
            + "objects, concepts, or experiences, allowing individuals to gain a more complete and accurate perception."
        ),
        "timeline": (
            "Week 1: Define project scope and objectives\n"
            + "Week 2: Set up version control (e.g., Git) and development environment\n"
            + "Week 3: Initial project setup and basic user interface\n"
            + "Week 4: Develop and test core functionalities\n"
            + "Week 5: Conduct first round of testing and implement user feedback\n"
            + "Week 6: Implement advanced features and begin integration testing\n"
            + "Week 7: Finalize testing, debugging, and user acceptance testing\n"
            + "Week 8: Deployment to production, conduct training sessions, and evaluate project success"
        ),
    }

    def setUp(self):
        Season.objects.create()
        self.full_user_data = get_full_user_data()
        self.user = User.objects.create_user(**self.full_user_data)

        User.objects.create_user(
            **(get_full_user_data(usr="22b1001", fn="Prayartan", ln="Pariyoj"))
        )
        User.objects.create_user(
            **(get_full_user_data(usr="22b1111", fn="Kuchbi", ln="Daldi Y."))
        )

        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

    def test_project_submission(self):
        project_submission_data = {
            **self.project_data,
            "co_mentors": [2, 3],
        }

        response = self.client.post(
            self.project_submission_url, project_submission_data, format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertListEqual(response.data["mentors"], [1, 2, 3])

    def test_project_no_co_mentor_field(self):
        project_submission_data = {
            **self.project_data,
        }

        response = self.client.post(
            self.project_submission_url, project_submission_data, format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertListEqual(response.data["mentors"], [1])

    def test_project_no_co_mentors(self):
        project_submission_data = {
            **self.project_data,
            "co_mentors": [],
        }

        response = self.client.post(
            self.project_submission_url, project_submission_data, format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertListEqual(response.data["mentors"], [1])
