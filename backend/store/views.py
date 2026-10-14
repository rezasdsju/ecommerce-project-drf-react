from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product, Category
from .serializers import ProductSerializer, Categoryserializer

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
    except Product.DoesNotExist():
        return Response({'error':'Product Not Found'}, status=404)
        
        
@api_view(['GET'])  
def get_categories(request):
    categories = Category.objects.all()
    serializer = Categoryserializer(categories, many=True)
    return Response(serializer.data)