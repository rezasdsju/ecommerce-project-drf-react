from django.contrib import admin
from .models import Category, Product, UserProfile, Order, OrderedProductInfo

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(UserProfile)
# admin.site.register(Order)
# admin.site.register(OrderItem)


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