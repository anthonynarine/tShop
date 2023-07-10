from .serializers import OrderSerializer
from .models import Order
from rest_framework import viewsets
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt

""""Validating user session and processing orders"""

def validate_user_session(id, token):
    """validate the user"""
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False


@csrf_exempt
def add(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({"error": "Please re-login, "})

    if request.method == "POST":
        #Retrieve the id, transaction_id, amount and products from the post request
        user_id = id
        transaction_id = request.POST["transaction_id"]
        amount = request.POST["amount"]
        products = request.POST["products"]
        
        all_products = len(products.split(",")[:-1])
        """splits the products string by comma (,)
            and counts the number of elements (products)
            in it. The -1 is used to exclude the last empty 
            element if the string ends with a comma."""

        UserModel = get_user_model() # retrieve the user model 

        try:
            user: UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return JsonResponse({"error": "User does not exist"})

        #create an instance of the order model with the attributes
        order = Order(
            user=user,
            product_names=products,
            total_products=all_products,
            transaction_id=transaction_id,
            total_amount=amount,
        )
        order.save()
        return JsonResponse(
            {"success": True, "error": False, "msg": "Order place Successfully"}
        )
     
#version 2 to be tested   
# @api_view(["POST"])
# @login_required
# def add(request):
    """
    Add a new order for the authenticated user.

    Request data:
        - transaction_id: The transaction ID for the order.
        - amount: The amount of the order.
        - products: A comma-separated string of product names.

    Returns:
        A JSON response indicating the success and status message of the order placement.
    """
#     if request.method == "POST":
#         user = request.user
#         transaction_id = request.data.get("transaction_id")
#         amount = request.data.get("amount")
#         products = request.data.get("products")

#         all_products = len(products.split(",")) - 1

#         try:
#             user = CustomUser.objects.get(pk=user.id)
#         except CustomUser.DoesNotExist:
#             return JsonResponse({"error": "User does not exist"})

#         order = Order.objects.create(
#             user=user,
#             product_name=products,
#             total_products=all_products,
#             transaction_id=transaction_id,
#         )
#         order.save()

#         return JsonResponse(
#             {"success": True, "msg": "Order placed successfully"}
#         )
        

        
        
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by("id")
    serializer_class = OrderSerializer
