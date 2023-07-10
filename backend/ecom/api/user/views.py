# goals
"""The code ensures that a unique session token is generated for each successful login attempt.
The token is associated with the user and saved in the database. Additionally,
the user is logged in by creating a session, allowing them to access authenticated views
in subsequent requests."""


import re
import secrets
import random
import string
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from .models import CustomUser
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework.authentication import TokenAuthentication


def generate_session_token(length=10):
    """
    Generate a secure session token of a specified length by using a
    cryptographically secure random number generator.

    Parameters:
        length (int): The desired length of the session token. Default is 16.

    Returns:
        str: The generated session token.

    """

    # version 1
    return "".join(
        random.SystemRandom().choice(
            [chr(i) for i in range(97, 123)] + [str(i) for i in range(10)]
        )
        for _ in range(10)
    )

    # version 2.
    # choices = string.ascii_letters + string.digits
    # token = "".join(secrets.choice(choices) for _ in range(length))
    # return token


@csrf_exempt
@authentication_classes([TokenAuthentication])  # Add the desired authentication class
@permission_classes([AllowAny])
def login_user(request):
    """Sign in functionality"""
    if request.method != "POST":
        return JsonResponse({"error": "Send a POST request with valid parameters only"})

    email = request.POST.get("email")
    password = request.POST.get("password")

    if not email or not password:
        return JsonResponse({"error": "Email and password are required"})

    # Validate email format using regular expression
    if not re.match(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", email):
        return JsonResponse({"error": "Enter a valid email"})

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(email=email)

        if user.check_password(password):
            if user.session_token != "0":
                user.session_token = "0"
                user.save()
                return JsonResponse({"error": "A previous session exists!"})

            token = generate_session_token()  # Generate session token
            user.session_token = token
            user.save()

            # Use Django's built-in authentication methods to login the user
            authenticated_user = authenticate(email=email, password=password)
            login(request, authenticated_user)

            serializer = UserSerializer(user)
            return JsonResponse({"token": token, "user": serializer.data})
        else:
            return JsonResponse({"error": "Invalid password"})

    except UserModel.DoesNotExist:
        return JsonResponse({"error": "Invalid email"})


def logout_user(request, id):
    # Log out the user using Django's built-in logout function
    logout(request)

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        user.session_token = "0"
        user.save()
    except UserModel.DoesNotExist:
        return JsonResponse({"error": "Invalid user ID"})

    return JsonResponse({"success": "Logged out"})


class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {"create": [AllowAny]}

    queryset = CustomUser.objects.all().order_by("id")
    serializer_class = UserSerializer

    def get_permissions(self):
        try:
            # Get the permission classes based on the current action, or use the default permission classes
            action_permission_classes = self.permission_classes_by_action.get(
                self.action, self.permission_classes
            )

            # Instantiate the permission classes
            permissions = [permission() for permission in action_permission_classes]
        except TypeError:
            # If an error occurs, fallback to the default permission classes
            permissions = [permission() for permission in self.permission_classes]

        # Return the list of instantiated permission classes
        return permissions
