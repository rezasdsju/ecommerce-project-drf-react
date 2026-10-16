import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../src/context/CartContext";
import { clearTokens, getAccessToken } from "../src/utils/auth";
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
        <nav>
            <Link to={`/`}>
                MohotCart
            </Link>


            <div>
                {
                    isLoggenIn ?
                        <>
                            <button onClick={handleLogOut}>LogOut</button>
                        </> :
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">SignUp</Link>
                        </>
                }
            </div>

            <Link to={`/cart`}>
                cart
                {
                    cartCount > 0 && (<span>{cartCount}</span>)
                }
            </Link>
        </nav>
    );
};

export default Navbar;