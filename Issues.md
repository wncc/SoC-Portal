# Issue Ideas

## Frontend

## Backend

- Current implementation of JWTAuth used does not invalidate tokens before expiry, meaning anyone with the token can still access until expiry, even if user logs out.
- Autocomplete
- Throttling/Debouncing
- Roll number validation in accounts
- Something something CSRF
- Roll number doesn't really require roll
- Current password validation implementation for Register User doesn't work properly for fields that also req the user. [Relevant StackOverflow question](https://stackoverflow.com/questions/36414804/integrate-django-password-validators-with-django-rest-framework-validate-passwor)
