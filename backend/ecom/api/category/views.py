from rest_framework import viewsets
from .serializer import CategorySerializer
from .models import Category


class CategoryViewSet(viewsets.ModelViewSet):
    """Viewset to get all categories"""
    #query the database
    queryset = Category.objects.all().order_by("name")
    #serialize the data 
    serializer_class = CategorySerializer
    
    

