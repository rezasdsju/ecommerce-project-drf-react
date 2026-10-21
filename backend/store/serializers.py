from rest_framework import serializers
from .models import Product, Category
from django.contrib.auth.models import User

class Categoryserializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name','slug']
        
class ProductSerializer(serializers.ModelSerializer):
    category = Categoryserializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset = Category.objects.all(),
        source = 'category',
        write_only = True
    )
    class Meta:
        model = Product
        fields = [
            'id', 'category', 'category_id', 'name',
            'description', 'current_price', 'original_price',
            'weight', 'rating', 'reviews', 'tags',
            'discount', 'image', 'created_at', 'unit'
        ]
        

        
        

        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ['id', 'username','email']
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'password2']
        

    def validate(self, data):
        if data['password']!=data['password2']:
            raise serializers.ValidationError('Password do not match')
        return data
            
    def create(self, validated_data):
        
        username = validated_data['username']
        email=validated_data['email']
        password=validated_data['password']
        user=User.objects.create_user(username=username, email=email, password=password)
        return user