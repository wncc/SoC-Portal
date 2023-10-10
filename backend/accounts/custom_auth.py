from rest_framework_simplejwt.authentication import JWTAuthentication


class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        header = super().authenticate(request)
        if header is None:
            # Attempt to get token from the cookie
            token = request.COOKIES.get("auth")
            if token:
                return self.get_user(self.get_validated_token(token)), None

        return header
