from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import User
# from settings import SIMPLE_JWT

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        header = super().authenticate(request)
        if header is None:
            # Attempt to get token from the cookie
            token = request.COOKIES.get("auth")
            if token:
                # user = User.objects.get(id = )
                return self.get_user(self.get_validated_token(token)), None
            
        return header
