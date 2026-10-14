from django.urls import path, include
from . import views

urlpatterns = [
    path('products/',views.get_products),                             
    path('products/<int:pk>/',views.get_product),
    path('categories/', views.get_categories),
]
