from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from django.contrib.auth.models import User

from .models import Order, Product, Category, OrderedProductInfo
from .serializers import ProductSerializer, Categoryserializer, RegisterSerializer, UserSerializer
import re


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    username = request.user.username
    return Response({'username':username})



@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_products(request):
    serializer = ProductSerializer(data = request.data, many=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    
    return Response(serializer.errors,status=400)




@api_view(['GET'])
def get_product(request, pk):
    try: 
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(product, context={'request': request})
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'error':'Product Not Found'}, status=404)
        
        
@api_view(['GET'])  
def get_categories(request):
    categories = Category.objects.all()
    serializer = Categoryserializer(categories, many=True)
    return Response(serializer.data)




@api_view(['GET'])
def get_category(request, slug):
    try: 
        category = Category.objects.get(slug=slug)
        products = category.products.all()
        product_serializer = ProductSerializer(
            products,
            many=True,
            context = {'request':request}
        )
        return Response({
            'category':category.name,
            'slug':category.slug,
            'products':product_serializer.data
        })
    except Category.DoesNotExist:
        return Response({'error':'Category Not Found'}, status=404)





@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_categories(request):
    serializer = Categoryserializer(data = request.data, many=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    
    return Response(serializer.errors,status=400)



    
@api_view(['POST'])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user_serializer = UserSerializer(user)
        return Response({'message':"User Created Successfully", "user":user_serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
     

from django.db import transaction
from rest_framework.throttling import AnonRateThrottle
from rest_framework.decorators import throttle_classes

@api_view(['POST'])
@transaction.atomic
@throttle_classes([AnonRateThrottle])
def order_create(request):
    try:
        data = request.data

        ordered_products = data.get('ordered_products', [])
        delivery_info = data.get('delivery_info', {})

        customer_name = delivery_info.get('customer_name', '').strip()
        address = delivery_info.get('address', '').strip()
        phone = delivery_info.get('phone', '').strip()
        payment_method = delivery_info.get('paymentMethod', 'cod')

        if not customer_name or not address or not phone:
            return Response(
                {'error': 'Name, address and phone are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not phone.isdigit() or len(phone) < 10:
            return Response(
                {'error': 'Invalid Phone Number'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not isinstance(ordered_products, list) or not ordered_products:
            return Response(
                {'error': 'Ordered products are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

      
        total_amount = 0
        number_of_products = 0
        products_to_save = []
        for item in ordered_products:
            try:
                product_id = int(item.get('product_id'))
                product_quantity = int(item.get('product_quantity'))

                if product_id < 1 or product_quantity < 1:
                    raise ValueError

            except (TypeError, ValueError):
                return Response(
                    {'error': 'Valid product id and quantity are required'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:
                product = Product.objects.get(id=product_id)
            except Product.DoesNotExist:
                return Response(
                    {'error': f'Product with id {product_id} not found'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            if product.current_price is None:
                return Response(
                    {'error': f'Price unavailable for {product.name}'},
                    status=status.HTTP_400_BAD_REQUEST
                )


            product_price_per_unit = product.current_price

            total_amount_for_this_product = (
                product_quantity * product_price_per_unit
            )
            
            products_to_save.append({
                "product_name": product.name,
                "quantity": f"{product_quantity} {product.unit}",
                "item_price_total": total_amount_for_this_product
            })

            total_amount += total_amount_for_this_product


            number_of_products += product_quantity

        order = Order.objects.create(
            customer_name=customer_name,
            address=address,
            phone=phone,
            payment_method=payment_method,
            number_of_products=number_of_products,
            total_amount=total_amount
        )
        for item in products_to_save:
            OrderedProductInfo.objects.create(
                order=order,
                product_name=item["product_name"],
                quantity=item["quantity"],
                item_price_total=item["item_price_total"]
            )

        return Response(
            {
                'message': 'Order Created Successfully',
                'order': {
                    'id': order.id,
                    'customer_name': order.customer_name,
                    'address': order.address,
                    'phone': order.phone,
                    'number_of_products': order.number_of_products,
                    'ordered_products_info': [
                            {
                                'product_name': item.product_name,
                                'quantity': item.quantity,
                                'item_price_total': str(item.item_price_total)
                            }
                            for item in order.ordered_products.all()
                        ],
                    'total_amount': str(order.total_amount),
                    'payment_method': order.payment_method
                }
            },
            status=status.HTTP_201_CREATED
        )

    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    
