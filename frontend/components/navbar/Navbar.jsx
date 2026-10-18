import { Link, useNavigate } from "react-router-dom";
// import { useCart } from "../src/context/CartContext";
import { clearTokens, getAccessToken } from "../../src/utils/auth";
import { IoCartOutline } from "react-icons/io5";
import { useContext } from "react";
import { CartContext } from "../../src/context/CartContext";

const Navbar = () => {
    const { cartItems } = useContext(CartContext)
    const navigate = useNavigate()
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
    const isLoggenIn = !!getAccessToken()
    const handleLogOut = () => {
        clearTokens()
        navigate('/login')
    }
    return (
        <div className="border-b border-gray-100 ">
            <nav className="flex items-center justify-between  px-2 py-4 max-w-6xl mx-auto">

                <div className="flex items-center">
                    <Link
                        to="/"
                        className="text-2xl font-bold bg-linear-to-r from-green-600 via-emerald-500 to-yellow-500 bg-clip-text text-transparent"
                    >
                        বাজার-সদাই
                    </Link>
                </div>




                <div className="flex items-center justify-center gap-1 min-[400px]:gap-3">
                    <div>
                        {
                            isLoggenIn ?
                                <>
                                    <button onClick={handleLogOut} className="bg-green-600 text-white border border-gray-100 rounded-xl px-4 py-2 font-bold">LogOut</button>
                                </> :
                                <div className="flex items-center justify-center gap-1 min-[400px]:gap-3">
                                    <Link to="/login" className="bg-white border border-gray-200 rounded-xl px-1 min-[400px]:px-4 py-2 text-black font-bold">সাইন ইন</Link>
                                    <Link to="/signup" className="bg-blue-100 text-black border border-gray-100 rounded-xl px-1 min-[400px]:px-4 py-2 font-bold">সাইন আপ</Link>
                                </div>
                        }
                    </div>

                    <Link
                        to="/cart"
                        className="flex items-center gap-0 min-[400px]:gap-2 px-0 py-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-700 hover:text-green-600 font-semibold relative"
                    >
                        {/* Cart Icon with Notification Badge */}
                        <div className="relative flex items-center">
                            <IoCartOutline className="text-2xl" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                                    {cartItems.length}
                                </span>
                            )}
                        </div>

                        {/* Text */}
                        <span className="text-sm font-bold">কার্ট</span>
                    </Link>
                </div>












            </nav>
        </div>
    );
};

export default Navbar;