from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(
        use_url=True, max_length=None, allow_empty_file=False, allow_null=True, required=False
    )
    class Meta:
        model = Product
        exclude = ["is_active", "created_at", "updated_at" ]