from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import CustomUser

"""
make sure to Tell the admin to use these forms
 by subclassing UserAdmin in users/admin.py:"""
class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = CustomUser
        fields ="__all__"


class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = CustomUser
        fields = "__all__"