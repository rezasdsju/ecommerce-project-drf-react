import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../src/context/CartContext";
import { clearTokens, getAccessToken } from "../src/utils/auth";
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {
    const { cartItems } = useCart()
    const navigate = useNavigate()
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
    const isLoggenIn = !!getAccessToken()
    const handleLogOut = () => {
        clearTokens()
        navigate('/login')
    }
    return (
        <div className="border-b border-gray-100 shadow-md">
            <nav className="flex items-center justify-between  px-2 py-4 max-w-6xl mx-auto">

                <div className="flex items-center">
                    <Link
                        to="/"
                        className="text-2xl font-bold bg-linear-to-r from-green-600 via-emerald-500 to-yellow-500 bg-clip-text text-transparent"
                    >
                        Bazar-Sodai
                    </Link>
                </div>




                <div className="flex items-center justify-center gap-3">
                    <div>
                        {
                            isLoggenIn ?
                                <>
                                    <button onClick={handleLogOut} className="bg-green-600 text-white border border-gray-100 rounded-xl px-4 py-2 font-bold">LogOut</button>
                                </> :
                                <div className="flex items-center justify-center gap-1 min-[400px]:gap-3">
                                    <Link to="/login" className="bg-blue-700 border border-gray-100 rounded-xl px-4 py-2 text-white font-bold">Login</Link>
                                    <Link to="/signup" className="bg-blue-300 text-black border border-gray-100 rounded-xl px-4 py-2 font-bold">SignUp</Link>
                                </div>
                        }
                    </div>

                    <div className="flex items-center justify-center gap-0">
                        <span><IoCartOutline /></span>
                        <Link to={`/cart`} className="text-neutral-500 font-bold">
                            Cart
                            {
                                cartCount > 0 && (<span>{cartCount}</span>)
                            }
                        </Link>
                    </div>
                </div>












            </nav>
        </div>
    );
};

export default Navbar;