from django.db import models

from django.contrib.auth.models import User
from decimal import ROUND_DOWN, Decimal
class Category(models.Model):
    name = models.CharField(max_length=100,unique=True)
    slug = models.SlugField(unique=True)
    def __str__(self):
        return self.name
class Product(models.Model):
    category = models.ForeignKey(
        Category,
        related_name='products',
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)

    current_price = models.DecimalField(max_digits=10, decimal_places=2,null=True,blank=True)
    original_price = models.DecimalField(max_digits=10, decimal_places=2,null=True)

    weight = models.CharField(max_length=50, blank=True)
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0)
    reviews = models.PositiveIntegerField(default=0)
    tags = models.JSONField(default=list, blank=True)
    discount = models.PositiveIntegerField(default=0)

    image = models.ImageField(upload_to='products/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    unit = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.name
    
    
    def save(self,*args, **kwargs):
        if self.original_price is not None:
            self.current_price = (self.original_price * (
                Decimal("1") - Decimal(self.discount) / Decimal("100")
            )).quantize(Decimal("1"), rounding=ROUND_DOWN)
        super().save(*args,**kwargs)    
    
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.TextField(max_length=15,blank=True)
    address = models.TextField(blank=True)
    
    def __str__(self):
        return self.user.username 
    




class Order(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    customer_name = models.CharField(max_length=255, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    phone = models.CharField(max_length=20,null=True, blank=True)
    number_of_products = models.PositiveIntegerField(default=0)
    payment_method = models.CharField(max_length=20,null=True,blank=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Order #{self.id} - {self.customer_name}"
    
    
    
class OrderedProductInfo(models.Model):
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name='ordered_products'
    )
    product_name = models.CharField(max_length=300, null=True, blank=True)
    quantity = models.CharField(max_length=50, null=True, blank=True)
    item_price_total = models.DecimalField(max_digits=10,decimal_places=2)
    
    def __str__(self):
        return self.product_name

    
    
    