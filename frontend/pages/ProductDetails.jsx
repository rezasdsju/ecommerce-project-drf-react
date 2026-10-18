
import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { useCart } from '../src/context/CartContext';
import { FaStar } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { GiShoppingCart } from "react-icons/gi";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { PiLineVerticalBold } from "react-icons/pi";
import { CartContext } from '../src/context/CartContext';
import { toast } from 'react-toastify';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { cartItems,setCartItems } = useContext(CartContext);
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
        setCartItems([...cartItems,product])
        const numberOfAddedSameProduct = cartItems.filter(item=>item.id===product.id).length+1
        toast.success(`${numberOfAddedSameProduct} ${product.unit} ${product.name} কার্টে অ্যাড করা হয়েছে`)
        // console.log('Cart Added')
        const createdAt = JSON.parse(localStorage.getItem('createdAt'))

        if (!createdAt) {
             const firtsItemCreatedAt = Date.now()
             localStorage.setItem('createdAt',JSON.stringify(firtsItemCreatedAt))
        }
        
   
    }
    console.log(cartItems)
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 my-10 max-w-7xl mx-auto px-2 sm:px-5'>
            <div className='border border-gray-100 rounded-2xl overflow-hidden'>
                <img src={product.image} alt={product.name} className='w-full h-auto object-cover ' />
            </div>
            <div>
                <h2 className='text-2xl font-bold'>{product.name}</h2>
                <div className='flex items-center justify-between border-b border-gray-100 py-5'>

                    <div className='flex items-center gap-3'>
                        <div className='flex items-center text-blue-500 font-bold'>
                            <span><FaBangladeshiTakaSign /></span>
                            <span>{product.current_price}</span>
                        </div>
                        {
                            product.discount > 0 &&
                            <div className='flex items-center line-through text-neutral-400'>
                                <span><FaBangladeshiTakaSign /></span>
                                <span>{product.original_price}</span>
                            </div>
                        }
                        {
                            product.discount > 0 &&
                            <div className='bg-red-100 rounded-xl px-2 py-1'>
                                <span className='text-red-600 font-semibold'>{product.discount}%</span>
                            </div>
                        }
                    </div>
                    <div className='flex items-center gap-2'>
                        {/* <span className='text-neutral-400'>1200 Sold</span> */}
                        <div className='flex items-center justify-center gap-1'>
                            <span className='font-bold'>{product.rating}</span>
<div className='flex items-center gap-0'>
                                {Array.from({ length: product.rating }, (_, i) => {
                                return <span key={i}><FaStar className='text-yellow-400' /> </span>
                            })}
</div>
                        </div>

                    </div>

                </div>
                <div className='my-5'>
                    <h2 className='text-red-400 font-bold'>পণ্য বিবরণ</h2>
                    <p className='text-neutral-500'>{product.description}</p>
                </div>
                <div className='flex items-center gap-2'>
                    <button onClick={handleAddToCart} className='bg-black text-white font-semibold px-6 py-2 rounded-xl cursor-pointer active:scale-95 transition-transform duration-150'>Add to Cart</button>
                    <button className='border border-gray-200 rounded-xl px-6 py-2 font-semibold'>Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;