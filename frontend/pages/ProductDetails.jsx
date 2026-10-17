
import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../src/context/CartContext';
import { FaStar } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { GiShoppingCart } from "react-icons/gi";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { PiLineVerticalBold } from "react-icons/pi";

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
    const handleAddToCart = () => {
        if (!localStorage.getItem('access_token')) {
            window.location.href('/login')
        }
        addToCart(product.id)
    }
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 my-10'>
            <div>
                <img src={product.image} alt={product.name} className='w-full h-auto' />
            </div>
            <div>
                <h2 className='text-2xl font-bold'>Laptop</h2>
                <div className='flex items-center justify-between border-b border-gray-100 py-5'>

                    <div className='flex items-center gap-3'>
                        <div className='flex items-center text-blue-500 font-bold'>
                            <span><FaBangladeshiTakaSign /></span>
                            <span>750</span>
                        </div>
                        <div className='flex items-center line-through text-neutral-400'>
                            <span><FaBangladeshiTakaSign /></span>
                            <span>850</span>
                        </div>
                        <div className='bg-red-100 rounded-xl px-2 py-1'>
                            <span className='text-red-600 font-semibold'>13%</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className='text-neutral-400'>1200 Sold</span>
                        <div className='flex items-center justify-center gap-1'>
                            <span className='font-bold'>4</span>
                            <span><FaStar className='text-yellow-400' /> </span>
                        </div>

                    </div>

                </div>
                <div className='my-5'>
                    <h2 className=''>Product Info</h2>
                    <p>Premium model with enhanced life water tracking, advanced filter, and large volume</p>
                </div>
                <div className='flex items-center gap-2'>
                    <button className='bg-black text-white font-semibold px-6 py-2 rounded-xl'>Add to Cart</button>
                    <button className='border border-gray-200 rounded-xl px-6 py-2 font-semibold'>Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;