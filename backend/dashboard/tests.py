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
    }
    sop = (  # Thank you ChatGPT
        "I find myself in the paradoxical pursuit of penning down a Statement of Purpose "
        + "on the merits of writing a Statement of Purpose. In this recursive endeavor, "
        + "my objective is to articulate the intrinsic motivations and aspirations that drive "
        + "this act of self-reflection. Through the convolution of words, I aim to navigate "
        + "the labyrinth of intent, elucidating the why behind the why, and the purpose behind "
        + "the purpose. As I embark on this linguistic adventure, the meta-narrative unfolds, "
        + "revealing the delightful complexity of expressing a purpose for expressing a purpose."
    )

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
            "project": self.project_data,
            "co_mentors": [2, 3],
            "sop": self.sop,
        }

        response = self.client.post(
            self.project_submission_url, project_submission_data, format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertListEqual(response.data["project"]["mentors"], [1, 2, 3])

    def test_project_no_co_mentor_field(self):
        project_submission_data = {
            "project": self.project_data,
            "sop": self.sop,
        }

        response = self.client.post(
            self.project_submission_url, project_submission_data, format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertListEqual(response.data["project"]["mentors"], [1])

    def test_project_no_co_mentors(self):
        project_submission_data = {
            "project": self.project_data,
            "co_mentors": [],
            "sop": self.sop,
        }

        response = self.client.post(
            self.project_submission_url, project_submission_data, format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertListEqual(response.data["project"]["mentors"], [1])
