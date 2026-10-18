import { HiMiniMinusSmall } from "react-icons/hi2";
import { HiMiniPlusSmall } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import { CartContext } from "../src/context/CartContext";

const CartItem = ({ product }) => {
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

    return (
        <div className="grid grid-cols-12 items-center gap-4 bg-white border border-gray-100 shadow-xs hover:shadow-md transition-all duration-300 rounded-2xl p-4 my-3">
            
            <div className="col-span-3 sm:col-span-2 bg-gray-50 border border-gray-100 p-2 rounded-xl flex items-center justify-center overflow-hidden">
                <img 
                    src={product.image} 
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
                            className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                                index % 3 === 0 ? 'bg-purple-50 text-purple-600' : 
                                index % 3 === 1 ? 'bg-rose-50 text-rose-600' : 
                                'bg-emerald-50 text-emerald-600'
                            }`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-3 pt-1">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                        <button 
                            onClick={handleRemoveSingleCartItem}
                            className="p-1.5 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
                            title="কমাও"
                        >
                            <HiMiniMinusSmall className="text-lg" />
                        </button>
                        
                        <span className="px-3 text-sm font-semibold text-gray-800">
                            {totalItems}
                        </span>
                        
                        <button 
                            onClick={handleAddCartItem}
                            className="p-1.5 hover:bg-gray-200 text-gray-600 transition-colors cursor-pointer"
                            title="বারাও"
                        >
                            <HiMiniPlusSmall className="text-lg" />
                        </button>
                    </div>

                    <button 
                        onClick={handleDeleteCartItems}
                        className="flex items-center gap-1 text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors cursor-pointer"
                        title="রিমুভ করুন"
                    >
                        <MdDelete className="text-base" />
                        <span className="hidden sm:inline">রিমুভ</span>
                    </button>
                </div>
            </div>

            <div className="col-span-12 sm:col-span-4 flex sm:flex-col justify-between sm:justify-center items-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                <span className="text-xs sm:text-sm text-gray-400">
                    প্রতি {product.unit}: <span className="font-medium text-gray-600">{product.current_price}৳</span>
                </span>
                <p className="text-sm sm:text-base font-semibold text-gray-600 mt-0.5">
                    {totalItems}টি = <span className="text-green-600 font-bold text-lg">{totalItems * product.current_price}৳</span>
                </p>
            </div>

        </div>
    );
};

export default CartItem;