import { Link } from "react-router-dom";
import { useCart } from "../src/context/CartContext";
const Navbar = () => {
    const { cartItems } = useCart()
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
    return (
        <nav>
            <Link to={`/`}>
                MohotCart
            </Link>

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