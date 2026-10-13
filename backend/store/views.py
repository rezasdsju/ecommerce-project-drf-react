from django.http import JsonResponse

# Create your views here.
def home(request):
    data = {
        'message': 'Welcome to ecommerce store'
    }
    return JsonResponse(data)