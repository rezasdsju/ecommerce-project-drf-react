from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User

from .models import Order, OrderItem, Product, Category, Cart, CartItem
from .serializers import ProductSerializer, Categoryserializer, CartItemSerializer, CartSerializer, RegisterSerializer, UserSerializer

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
# @permission_classes([IsAuthenticated])
def order_create(request):
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
            product_quantity=int(product_quantity)
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
            product_quantity=product_quantity,
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
    
    
    
@api_view(['POST'])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user_serializer = UserSerializer(user)
        return Response({'message':"User Created Successfully", "user":UserSerializer(user).data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
