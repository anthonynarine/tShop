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
from django.contrib.auth import login, logout as django_logout
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


@csrf_exempt  # allows sign in from other origins
# @authentication_classes([[TokenAuthentication]])
# @permission_classes([])
def login_user(request):
    """sign in functionality"""
    # if the request is not a POST
    if request.method != "POST":
        return JsonResponse({"error": "Send a post request with valid parameters only"})
    # extract the username and password data from the login request
    username = request.POST["email"]
    password = request.POST["password"]
     # Validate email format using regular expression
    if not re.match(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", username):
        return JsonResponse({"error": "Enter a valid e-mail"})
    # check if pw lenght is not less than 6 chars
    if len(password) < 6:
        return JsonResponse({"error": "Password needs to be at least 6 characters"})

    # once a valid email and password are entered create a UserModel instance with entered credentials
    UserModel = get_user_model()

    """
   retrieves the user model using the get_user_model() 
     function, which returns the currently active user model."""
    try:
        user = UserModel.objects.get(email=username)

        if user.check_password(password):
            user_dict = UserModel.objects.filter(
                email=username).values().first()
            user_dict.pop("password")

            if user.session_token != "0":
                user.session_token = "0"
                user.save()
                return JsonResponse({"error": "A previous session exists!"})
            # if the user has no token create one for him/her
            token = generate_session_token()  # custom func above
            user.session_token = token
            user.save()
            login(request, user) #django resource
            return JsonResponse({"token": token, "user": user_dict})
        else:
            # if pw does not match any
            return JsonResponse({"error": "Invalid password"})

    except UserModel.DoesNotExist:
        return JsonResponse({"error": "Invalid Email"})


def logout(request, id):
    # Log out the user using Django's built-in logout function
    django_logout(request)

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
