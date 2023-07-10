
"""UserSerializer - serializes and deserializes data for the CustomUser model.
Let's go through the code and explain its functionality:"""


from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.hashers import make_password

# The make_password func is a utility provided by Django to securely hash passwords
from rest_framework.decorators import authentication_classes, permission_classes


class UserSerializer(serializers.ModelSerializer):
    #validated_data comes in a key value format and we are targeting the 
    # key password to save the value is has. more below
    def create(self, validated_data):
        """creating and saving a new instance of the associated
        model based on the provided validated_data"""
        password = validated_data.pop("password", None) #reomves the password key returns none if there is none
        instance = self.Meta.model(**validated_data) # instance of CustomUser - validated data  unpacks the key value pairs

        # check if a password was provided in the "validated_data"
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        """In summary, the update method updates an existing instance of 
        the associated model (CustomUser) based on the provided validated
        data. It iterates over the validated data, sets the password field 
        if it's present, and updates other fields using the setattr function. """
        for attr, value in validated_data.items():
            # attribute is the key "password"
            if attr == "password":
                # set the instance password the the value
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
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


"""validated_data is a dictionary that contains the validated input data for creating the new instance. 
It typically contains the field values submitted in the request after passing through the serializer's
validation process."""