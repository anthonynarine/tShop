
from rest_framework import routers
from django.urls import path, include
from . import views

#create an instance of default router (used to define api endpoints)
router = routers.DefaultRouter()
#register a your viewset
router.register(r'', views.UserViewSet)

urlpatterns = [
    path("signin/", views.login, name="login"),
    path("logout/<int:id>/", views.logout, name="logout"),
    path("", include(router.urls)), 
]