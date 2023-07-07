from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from .managers import CustomUserMaager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = None
    name = models.CharField(max_length=50, default="Anonymous")
    email = models.EmailField(max_length=100, unique=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    phone = models.CharField(max_length=20, blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)

    session_token = models.CharField(max_length=10, default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # identify user by email not username
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserMaager()

    def __str__(self) -> str:
        return self.email
