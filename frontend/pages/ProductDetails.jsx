
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../src/context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { addToCart } = useCart();
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

    useEffect(() => {
        fetch(`${BASE_URL}/api/products/${id}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch product detail');
                }
                return response.json();
            })
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [id, BASE_URL]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>No Product Found</div>;
    }
const handleAddToCart = ()=>{
    if (!localStorage.getItem('access_token')){
        window.location.href('/login')
    }
    addToCart(product.id)
}
    return (
        <div>
            <div>
                {product.image && (
                    <div>
                        <img
                            src={`${BASE_URL}${product.image}`}
                            alt={product.name}
                            className="w-full md:w-1/2 h-auto object-cover rounded-lg"
                        />
                    </div>
                )}

                <div>
                    <h1>{product.name}</h1>
                    <p>{product.price}</p>
                    <p>{product.description}</p>
                </div>

                <button onClick={handleAddToCart}>Add to Cart</button>
                <button onClick={() => navigate('/')}>Back to home</button>
            </div>
        </div>
    );
};

export default ProductDetails;