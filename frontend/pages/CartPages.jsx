import { useCart } from "../src/context/CartContext.jsx";

const CartPages = () => {
    const { cartItems, removeProductFromCart, updateQuantity } = useCart();

    const total = cartItems.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
    );

    return (
        <div>
            <h1>Your Cart</h1>

            {cartItems.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                cartItems.map((item) => (
                    <div key={item.id}>
                        <h2>{item.name}</h2>
                        <p>Price: {item.price}</p>

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
                            {(Number(item.price) * item.quantity).toFixed(2)}
                        </p>
                    </div>
                ))
            )}

            {cartItems.length > 0 && (
                <h2>Total: {total.toFixed(2)}</h2>
            )}
        </div>
    );
};

export default CartPages;