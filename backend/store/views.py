from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User

from .models import Order, Product, Category, Cart, CartItem,OrderedProductInfo
from .serializers import ProductSerializer, Categoryserializer, CartItemSerializer, CartSerializer, RegisterSerializer, UserSerializer
import re
@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

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
        # serializer = Categoryserializer(category, context={'request': request})
        return Response({
            'category':category.name,
            'slug':category.slug,
            'products':product_serializer.data
        })
    except Category.DoesNotExist:
        return Response({'error':'Category Not Found'}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get('product_id')
    product = Product.objects.get(id=product_id)
    cart, created = Cart.objects.get_or_create(user=request.user)
    item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        item.quantity+=1
        item.save()
    return Response({'message':'Product added to Cart', 'cart':CartSerializer(cart).data})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    item_id = request.data.get('item_id')
    CartItem.objects.filter(id=item_id).delete()
    return Response({'message':'Item removed from cart'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_cart_quantity(request):
    item_id = request.data.get('item_id')
    quantity = request.data.get('quantity')
    
    if not item_id or quantity is None:
        return Response({'error':'Item ID and quantity is required'},status=404)
    try:
        item = CartItem.objects.get(id=item_id,cart__user=request.user)
        if int(quantity)<1 :
            item.delete()
            return Response({'error':'Quantity must be at least 1'}, status=400)
        item.quantity = quantity
        item.save()
        serializer = CartItemSerializer(item)
        return Response(serializer.data)
    except CartItem.DoesNotExist:
        return Response({'error':'Cart Item Not Found'},status=400)
       
       
       

    
@api_view(['POST'])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user_serializer = UserSerializer(user)
        return Response({'message':"User Created Successfully", "user":UserSerializer(user).data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
     
        
# @api_view(['POST'])
# # @permission_classes([IsAuthenticated])
# def order_create(request):
    try:
        data = request.data 
        customer_name = data.get('customer_name','').strip()
        address = data.get('address','').strip()
        phone = data.get('phone','').strip()
        payment_method = data.get('paymentMethod','cod')
        product_id = data.get('product_id','')
        product_quantity = data.get('product_quantity')
        
        if not customer_name or not address or not phone:
            return Response(
                {
                    'error':'Name, address and phone are required',
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        if not phone.isdigit() or len(phone)<10:
            return Response(
                {'error':'Invalid Phone Number'},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            product_id=int(product_id)
            match = re.search(r'\d+', str(product_quantity))
            if not match:
                return Response(
                    {'error': 'Invalid product quantity'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            product_quantity = int(match.group())
            if product_id<1 or product_quantity<1:
                raise ValueError
        except (TypeError,ValueError):
            return Response(
                {'error':'Valid product id and quantity are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response(
                {'error':'Product Not Found'},
                status=status.HTTP_400_BAD_REQUEST
            )
        if product.current_price is None:
            return Response(
                {'error':'Product Price is unavailable'},
                status=status.HTTP_400_BAD_REQUEST
            )
        total_amount = product.current_price*product_quantity
        
        order = Order.objects.create(
            customer_name=customer_name,
            address=address,
            phone=phone,
            payment_method=payment_method,
            product_name=product.name,
            product_quantity=f'{product_quantity} {product.unit}',
            total_amount=total_amount
        )
        return Response(
            {
                'message':'Order Created Successfully',
                'order':{
                    'id':order.id,
                    'customer_name':order.customer_name,
                    'product_name':order.product_name,
                    'product_quantity':order.product_quantity,
                    'total_amount':str(order.total_amount),
                    'payment_method':order.payment_method
                }
            },
            status=status.HTTP_201_CREATED
        )
    except Exception as e:
        return Response({'error':str(e)},status=500)
    











from django.db import transaction

@api_view(['POST'])
@transaction.atomic
# @permission_classes([IsAuthenticated])
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

        # ordered_products_info = []
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

            # dictionary_of_this_item = {
            #     "product_name": product_name,
            #     "product_quantity": f"{product_quantity}{product_unit}",
            #     "total_price": f"{total_amount_for_this_product} টাকা"
            # }


            number_of_products += product_quantity
            # ordered_products_info.append(dictionary_of_this_item)

        order = Order.objects.create(
            customer_name=customer_name,
            address=address,
            phone=phone,
            payment_method=payment_method,
            number_of_products=number_of_products,
            # ordered_products_info=ordered_products_info,
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
    
