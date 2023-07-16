from unittest import result
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
import braintree


# coded taken direct from braintree docs simple server tap
gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        braintree.Environment.Sandbox,
        merchant_id="kgwtb4ncdwh7h3rt",  # api private key tab
        public_key="53dry9wzwv58pqp2",
        private_key="f0a067262957e9b2d13835e55bbeb40c",
    )
)

# check if user has signed up
def validate_user_session(id, token):
    UserModel = get_user_model
    try:
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False


# send a token
@csrf_exempt
def generate_gateway_token(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({"error": "invalid session, Please login again!"})

    return JsonResponse(
        {"clientToken": gateway.client_token.generate(), "success:": "True"}
    )


# Create a transaction (payment processing)
@csrf_exempt
def process_payment(request, id, token):
    # make sure user is validated
    if not validate_user_session(id, token):
        return JsonResponse({"error": "invalid session, Please login again!"})

    nonce_from_the_client = request.POST["paymentMethodNonce"]
    amount_from_the_client = request.POST["paymentAmount"]

    result = gateway.transaction.sale(
        {
            "amount": amount_from_the_client,
            "payment_method_nonce": nonce_from_the_client,
            "options": {"submit_for_settlement": True},
        }
    )

    if result.is_success:
        return JsonResponse(
            {
                "success": result.is_success,
                "transaction": {
                    "id": result.transaction.id,
                    "amount": result.transaction.amount,
                },
            }
        )
    else:
        return JsonResponse({"error": True, "success": False})
