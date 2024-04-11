import requests
from django.conf import settings
from rest_framework.response import Response
from rest_framework.exceptions import APIException
from rest_framework import status

IITB_SSO = settings.IITB_SSO


class SSOError(APIException):
    """Exception for SSO errors."""

    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "Something went wrong with the SSO"
    default_code = "sso_error"


def fetch_from_sso(auth_code, redir, request):
    """Perform login with code and redir."""
    # Get our access token
    post_data = {
        "code": auth_code,
        "redirect_uri": redir,
        "grant_type": "authorization_code",
    }
    post_data = (
        "code="
        + auth_code
        + "&redirect_uri="
        + redir
        + "&grant_type=authorization_code"
    )
    print(IITB_SSO)
    response = requests.post(
        IITB_SSO["TOKEN_URL"],
        data=post_data,
        headers={
            "Authorization": "Basic " + IITB_SSO["CLIENT_SECRET_BASE64"],
            "Content-Type": "application/x-www-form-urlencoded",
        },
        verify=not settings.SSO_BAD_CERT,
        allow_redirects=False,
        timeout=10,
    )
    response_json = response.json()

    # Check that we have the access token
    if "access_token" not in response_json:
        raise SSOError(
            response_json or "SSO server did not validate request, try again",
        )

    # Get the user's profile
    profile_response = requests.get(
        IITB_SSO["PROFILE_URL"],
        headers={
            "Authorization": "Bearer " + response_json["access_token"],
        },
        verify=not settings.SSO_BAD_CERT,
        timeout=10,
    )
    profile_json = profile_response.json()

    # Check if we got at least the user's SSO id
    if "id" not in profile_json:
        raise SSOError(
            "SSO server did not send requested info, try again",
        )

    # Check that we have basic details like name and roll no.
    required_fields = ["first_name", "roll_number", "username"]
    if not all(
        [((field in profile_json) and profile_json[field]) for field in required_fields]
    ):
        raise SSOError(
            "All required fields not present",
        )

    return profile_json
