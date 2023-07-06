from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.hashers import make_password

# The make_password func is a utility provided by Django to securely hash passwords
from rest_framework.decorators import authentication_classes, parser_classes


class UserSerializer(serializers.ModelSerializer):
    #validated_data comes in a key value format and we are targeting the 
    # key password to save the value is has. 
    def create(self, validated_data):
        """creating and saving a new instance of the associated
        model based on the provided validated_data"""
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)

        # check if a password was provided in the "validated_data"
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attribue, value in validated_data.items():
            # attribute is the key "password"
            if attribue == "password":
                # set the instance password the the value
                instance.set_password(value)
            else:
                setattr(instance, attribue, value)
        instance.save()
        return instance

    class Meta:
        model = CustomUser
        extra_kwargs = {"password": {"write_only": True}}
        fields = (
            "name",
            "email",
            "password",
            "phone",
            "gender",
            "is_active",
            "is_staff",
            "is_superuser",
        )
