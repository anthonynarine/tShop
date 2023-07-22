
from rest_framework import routers
from django.urls import path, include
from . import views

#create an instance of default router (used to define api endpoints)
router = routers.DefaultRouter()
#register a your viewset
router.register(r'', views.UserViewSet)

urlpatterns = [
    path("login/", views.login_user, name="login"),
    path("logout/<uuid:id>/", views.logout_user, name="logout"),
    path("", include(router.urls)), 
]