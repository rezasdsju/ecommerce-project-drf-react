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
    # user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    customer_name = models.CharField(max_length=50,null=True, blank=True)
    address = models.CharField(max_length=50,null=True, blank=True)
    phone = models.CharField(max_length=50,null=True, blank=True)
    payment_method = models.CharField(max_length=50,null=True, blank=True)
    product_name = models.CharField(max_length=50,null=True, blank=True)
    product_quantity = models.CharField(max_length=30,null=True,blank=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)


    def __str__(self):
        return f'Order {self.id}'
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)    
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveBigIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f'{self.quantity} x {self.product.name}'
    
    
    
class Cart(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'Cart: {self.id} for {self.user}'
        
    @property
    def total(self):
        return sum(item.subtotal for item in self.items.all())

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity = models.PositiveBigIntegerField(default=1)
    def __str__(self):
        return f'{self.quantity} x {self.product.name}'
    
    @property
    def subtotal(self):
        return self.quantity*self.product.price