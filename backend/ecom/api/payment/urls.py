from django.urls import path, include
from . import views

urlpatterns = [
    path(
        "gettoken/<str:id>/<str:token>/",
        views.generate_gateway_token,
        name="token_generation",
    ),
    path(
        "process/<str:id>/<str:token>/", views.process_payment, name="payment_process"
    ),
]
