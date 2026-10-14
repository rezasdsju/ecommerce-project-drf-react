
import { useCart } from "../src/context/CartContext.jsx";
import { Link } from "react-router-dom";
const CartPages = () => {
    const { cartItems, total, removeProductFromCart, updateQuantity } = useCart();


    return (
        <div>
            <h1>Your Cart</h1>
 
        
            {cartItems.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                cartItems.map((item) => (
                    <div key={item.id}>
                        <img
                            src={`${import.meta.env.VITE_DJANGO_BASE_URL}${item.product_image}`}
                            alt={item.product_name}
                            className="w-24 h-24 object-cover"
                        />
                        <h2>{item.product_name}</h2>
                        <p>Price: {item.product_price}</p>

                        <p>Quantity: {item.quantity}</p>

                        <button
                            onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                        >
                            -
                        </button>

                        <button
                            onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                            }
                        >
                            +
                        </button>

                        <button
                            onClick={() => removeProductFromCart(item.id)}
                        >
                            Remove
                        </button>

                        <p>
                            Subtotal:{" "}
                            {(Number(item.product_price) * item.quantity).toFixed(2)}
                        </p>
                    </div>
                ))
            )}

            {cartItems.length > 0 && (
                <h2>Total: {Number(total).toFixed(2)}</h2>

            )}
           <Link to={`/checkout`}>Procedd to checkout</Link>
        </div>
    );
};

export default CartPages;
