from django.contrib import admin
from .models import Category, Product, UserProfile, Order, OrderedProductInfo


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id','name','slug']

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
            'id', 'category', 'category_id', 'name',
            'description', 'current_price', 'original_price',
            'weight', 'rating', 'reviews', 'tags',
            'discount', 'image', 'created_at', 'unit'
        ]
    
    
    
admin.site.register(UserProfile)



class OrderedProductInfoInline(admin.TabularInline):
    model = OrderedProductInfo
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'customer_name',
        'number_of_products',
        'total_amount',
        'created_at',
    )
    inlines = [OrderedProductInfoInline]