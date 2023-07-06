
from django.db import models
from api.category.models import Category
from django.core.exceptions import ValidationError

def validate_positive(value):
    """ if value is less than or equal to 0, we raise a ValidationError"""
    if value <= 0:
        raise ValidationError("value must be a positive integer")
    
    
# Create your models here.
class Product(models.Model):
    category = models.ForeignKey(Category, null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=250)
    price = models.IntegerField(validators=[validate_positive])
    stock = models.IntegerField(validators=[validate_positive])
    is_active = models.BooleanField(default=True, blank=True)
    image = models.ImageField(upload_to="images/", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    
    def __str__(self):
        return self.name
