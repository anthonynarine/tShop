from .serializers import ProductSerializer
from .models import Product
from rest_framework import viewsets


class ProductViewSet(viewsets.ModelViewSet):
    """Viewset to get all categories"""
    #query the database
    queryset = Product.objects.all().order_by("id")
    #serialize the data 
    serializer_class = ProductSerializer
    
    
