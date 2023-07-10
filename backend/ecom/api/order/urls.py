

from rest_framework import routers
from django.urls import path, include
from . import views

#create an instance of default router (used to define api endpoints)
router = routers.DefaultRouter()
#register a your viewset
router.register(r'', views.OrderViewSet)

urlpatterns = [
    path("add/<str:id>/<str:token>/", views.add, name="order.add"),
    path("", include(router.urls))
]