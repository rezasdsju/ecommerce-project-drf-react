import { Link } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { GiShoppingCart } from "react-icons/gi";
import { useContext } from 'react';
import { CartContext } from '../../src/context/CartContext';

import { toast } from 'react-toastify';
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";

const ProductCard = ({ product }) => {
    const { cartItems, setCartItems } = useContext(CartContext)



    const matchedProducts = cartItems.filter(item => item.id === product.id)

    const handleAddToCart = () => {
        setCartItems([...cartItems, product])
        toast.success(`কার্টে অ্যাড করা হয়েছে`)

    }
    const handleDeleteFromCart = () => {
        const firstIndex = cartItems.findIndex(item => item.id === product.id)
        const remaining = cartItems.filter((_, index) => index !== firstIndex)
        setCartItems(remaining)
        toast.info(`কার্ট থেকে সরানো হয়েছে`)
    }



    const rating = Number(product.rating)
    const fullStars = Math.floor(rating)
   
    const fraction = Number((rating - fullStars).toFixed(2));
    const percentage = fraction * 100
   

    return (

        <div className='border border-gray-100 px-2 py-2 rounded-2xl  space-y-4 '>

            <Link to={`/product/${product.id}`} className='space-y-2'>
                <div className='relative '>
                    {
                        product.image && <img
                            src={
                                product.image.startsWith('http') ? product.image :
                                    `${import.meta.env.VITE_DJANGO_BASE_URL}${product.image}`
                            }
                            alt={product.name}

                            className="w-full h-56 object-cover rounded-lg mb-4" />
                    }
                    {
                        product.discount > 0 && <span
                            className="absolute top-0 right-0 bg-linear-to-r from-purple-600 via-pink-500 to-rose-500 text-white text-sm font-bold px-3 py-2
    [clip-path:polygon(0%_0%,100%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]"
                        >
                            {product.discount}% <br /> ছাড়
                        </span>
                    }
                </div>

                <div className='space-y-2'>
                    <div className='flex items-center text-2xl font-semibold text-gray-800 truncate'>
                        <h2 className="">{product.name}</h2>

                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-0'>
                            <div className='flex items-center gap-0'>
                                {Array.from({ length: fullStars }, (_, i) => {
                                    return <span key={i}><FaStar className='text-yellow-400' /> </span>
                                })}
                            </div>
                            {
                                fraction > 0 &&
                                <div className="relative inline-block">
                                    <FaStar className="text-gray-300" />
                                    <div
                                        className="absolute left-0 top-0 overflow-hidden"
                                        style={{ width: `${percentage}%` }}
                                    >
                                        <FaStar className="text-yellow-400" />
                                    </div>
                                </div>
                            }
                        </div>
                       
                        <span><span className='font-bold'>{product.rating}</span> ({product.reviews} reviews)</span>
                    </div>


                    <div className='flex items-center flex-wrap gap-2'>
                        {
                            product.tags.map((tag, index) => <p key={index} className={`${index % 3 === 0 ? 'bg-purple-100' : index % 3 === 1 ? 'bg-red-50' : 'bg-green-100'} rounded-xl px-3 py-1`}>{tag}</p>)
                        }

                    </div>
                    <div className='flex items-center flex-wrap gap-3'>
                        <div className='flex items-center gap-1'>
                            <div className='flex items-center text-blue-500 font-bold'>
                                <span><FaBangladeshiTakaSign /></span>
                                <span>{product.current_price}</span>


                            </div>

                            {
                                product.unit &&
                                <div className='text-xs text-neutral-400'>
                                    (প্রতি {product.unit})
                                </div>
                            }
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
                </div>
            </Link>

            <div>
                {
                    matchedProducts.length > 0 ?
                        <div className='flex items-center justify-center gap-5 bg-gray-100 border border-green-100 rounded-2xl px-4 py-2'>
                            <span onClick={handleDeleteFromCart} className='cursor-pointer'><CiCircleMinus /></span>
                            <span className='bg-green-200 rounded-xl px-3 py-1 '>{matchedProducts.length}</span>
                            <span onClick={handleAddToCart} className='cursor-pointer'><CiCirclePlus /></span>
                        </div> :
                        <div onClick={handleAddToCart} className='flex items-center justify-center gap-2  bg-green-700 rounded-2xl py-2 text-white cursor-pointer my-2 active:scale-95 transition-transform duration-150  '>
                            <span><GiShoppingCart /></span>
                            <span >কার্টে যোগ করুন</span>
                        </div>
                }
            </div>

        </div>
    );
};

export default ProductCard;