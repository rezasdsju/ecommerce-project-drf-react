import { Link } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { GiShoppingCart } from "react-icons/gi";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { PiLineVerticalBold } from "react-icons/pi";

const ProductCard = ({ product }) => {
    return (

        <div className='border border-gray-100 px-2 py-2 rounded-2xl  space-y-4 '>

            <Link to={`/product/${product.id}`} className='space-y-2'>
                <div >
                    {
                        product.image && <img
                            src={`${import.meta.env.VITE_DJANGO_BASE_URL}${product.image}`}
                            alt={product.name}

                            className="w-full h-56 object-cover rounded-lg mb-4" />
                    }
                </div>
                <div className='space-y-2'>
                    <div className='flex items-center text-2xl font-semibold text-gray-800 truncate'>
                        <h2 className="">{product.name}</h2>
                        <span className='flex items-center'><MdOutlineHorizontalRule /></span>
                        <span>5kg</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span><FaStar className='text-yellow-400' /> </span>
                        <span><span className='font-bold'>4</span> (124 reviews)</span>
                    </div>
                    <div className='flex items-center flex-wrap gap-2'>
                        <p className='bg-purple-100 rounded-xl px-3 py-1'>তাজা ও প্রাকৃতিক</p>
                        {/* <span><PiLineVerticalBold /></span> */}
                        <p className='bg-red-50 rounded-xl px-3 py-1'>সুগন্ধি</p>
                        {/* <span><PiLineVerticalBold /></span> */}
                        <p className='bg-green-100 rounded-xl px-3 py-1'>লম্বা দানা</p>
                    </div>
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
                </div>
            </Link>
            <div className='flex items-center justify-center gap-2  bg-green-700 rounded-2xl py-2 text-white cursor-pointer my-2'>
                <span><GiShoppingCart /></span>
                <span>কার্টে যোগ করুন</span>
            </div>
        </div>
    );
};

export default ProductCard;