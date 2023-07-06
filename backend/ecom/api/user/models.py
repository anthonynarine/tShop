from unittest.util import _MAX_LENGTH
from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    name = models.CharField(max_length=50, default="Anonymous")
    email = models.EmailField(max_length=100, unique=True)
    
    #user field is overidden. used as default for base user
    username = None
    
    #identify user by email not username
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    
    phone = models.CharField(max_length=20, blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    
    session_token = models.CharField(max_length=10, default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)