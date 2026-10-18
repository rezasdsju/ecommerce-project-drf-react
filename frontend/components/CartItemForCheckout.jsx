import { HiMiniMinusSmall } from "react-icons/hi2";
import { HiMiniPlusSmall } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { useContext, useState } from "react";
import { CartContext } from "../src/context/CartContext";

const CartItemForCheckout = ({ product, quantity, setQuantity }) => {
    const { cartItems, setCartItems } = useContext(CartContext);

    const totalItems = cartItems.filter(item => item.id === product.id).length;

    const handleDeleteCartItems = () => {
        const remaining = cartItems.filter(item => item.id !== product.id);
        setCartItems(remaining);
    };

    const handleRemoveSingleCartItem = () => {
        const firstIndex = cartItems.findIndex(item => item.id === product.id);
        if (firstIndex !== -1) {
            const remaining = cartItems.filter((_, index) => index !== firstIndex);
            setCartItems(remaining);
        }
    };

    const handleAddCartItem = () => {
        setCartItems([...cartItems, product]);
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1)
    }
    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    return (
        <div>
            <div className="grid grid-cols-12 items-center gap-4 bg-white border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 rounded-2xl p-4 my-3 py-10">

                <div className="col-span-3 sm:col-span-2 bg-gray-50 border border-gray-100 p-2 rounded-xl flex items-center justify-center overflow-hidden">
                    <img
                        src={
                            product.image?.startsWith('http') ? product.image :
                                `${import.meta.env.VITE_DJANGO_BASE_URL}${product.image}`
                        }
                        alt={product.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain hover:scale-105 transition-transform duration-300"
                    />
                </div>

                <div className="col-span-9 sm:col-span-6 space-y-2">
                    <h2 className="font-bold text-lg sm:text-xl text-gray-800">{product.name}</h2>

                    <div className='flex items-center flex-wrap gap-1.5'>
                        {product.tags?.map((tag, index) => (
                            <span
                                key={index}
                                className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${index % 3 === 0 ? 'bg-purple-50 text-purple-600' :
                                    index % 3 === 1 ? 'bg-rose-50 text-rose-600' :
                                        'bg-emerald-50 text-emerald-600'
                                    }`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>


                </div>

                <div className="col-span-12 sm:col-span-4 flex sm:flex-col justify-between sm:justify-center items-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                    <div className="flex items-center gap-3 pt-1">
                        <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                            <button
                                onClick={handleDecreaseQuantity}
                                className="p-1.5 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
                                title="কমাও"
                            >
                                <HiMiniMinusSmall className="text-lg" />
                            </button>

                            <span className="px-3 text-sm font-semibold text-gray-800">
                                {quantity} {product.unit}
                            </span>

                            <button
                                onClick={handleIncreaseQuantity}
                                className="p-1.5 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
                                title="বারাও"
                            >
                                <HiMiniPlusSmall className="text-lg" />
                            </button>
                        </div>

                        {/* <button 
                        onClick={handleDeleteCartItems}
                        className="flex items-center gap-1 text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors cursor-pointer"
                        title="রিমুভ করুন"
                    >
                        <MdDelete className="text-base" />
                        <span className="hidden sm:inline">রিমুভ</span>
                    </button> */}
                    </div>

                </div>


            </div>
            {/* <span className="text-xs sm:text-sm text-gray-400">
                প্রতি {product.unit}: <span className="font-medium text-gray-600">{product.current_price}৳</span>
            </span>
            <p className="text-sm sm:text-base font-semibold text-gray-600 mt-0.5">
                {quantity} {product.unit} = <span className="text-green-600 font-bold text-lg">{quantity * product.current_price}৳</span>
            </p> */}
<div className="border border-gray-100 bg-gray-50/50 rounded-2xl p-4 space-y-3 shadow-2xs">
    <div className="flex items-center justify-between text-sm text-gray-600">
        <span className="font-medium">পরিমাণ</span>
        <span className="font-semibold text-gray-800 bg-white px-2.5 py-0.5 rounded-md border border-gray-100 shadow-2xs">
            {quantity} {product.unit}
        </span>
    </div>

    <div className="flex items-center justify-between text-sm text-gray-600">
        <span className="font-medium">প্রতি {product.unit}</span>
        <span className="font-semibold text-gray-800">{product.current_price}৳</span>
    </div>

    <div className="flex items-center justify-between border-t border-gray-200/80 pt-3 mt-1">
        <span className="font-bold text-gray-800 text-base">মোট</span>
        <span className="font-bold text-xl text-green-600">
            {product.current_price * quantity}৳
        </span>
    </div>
</div>
    
        </div>
    );
};

export default CartItemForCheckout;