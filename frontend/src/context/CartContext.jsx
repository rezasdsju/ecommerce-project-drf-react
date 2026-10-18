
import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();
import { authFetch, getAccessToken } from "../utils/auth";
const CartProvider = ({ children }) => {
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [total, setTotal] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [addToCart, setAddToCart] = useState([])

    const fetchCart = async () => {
        try {
            const res = await authFetch(`${BASE_URL}/api/cart/`);
            // if (!res.ok) {
            //     throw new Error("Failed to fetch Cart");
            // }
            const data = await res.json();
            setCartItems(data.items || []);
            setTotal(data.total || 0);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // const addToCart = async (product) => {
    //     try {
    //         const res = await authFetch(`${BASE_URL}/api/cart/add/`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ product_id: product.id }),
    //         });
    //         if (!res.ok) throw new Error("Failed to add product");
    //         await fetchCart();
    //     } catch (error) {
    //         console.error("Error adding to Cart:", error);
    //     }
    // };

    const removeProductFromCart = async (itemId) => {
        try {
            const res = await authFetch(`${BASE_URL}/api/cart/remove/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ item_id: itemId }),
            });
            if (!res.ok) throw new Error("Failed to remove item");
            await fetchCart();
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) {
            await removeProductFromCart(itemId);
            return;
        }

        try {
            const res = await authFetch(`${BASE_URL}/api/cart/update/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    item_id: itemId,
                    quantity: quantity,
                }),
            });
            if (!res.ok) throw new Error("Failed to update quantity");
            await fetchCart();
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    };


    const clearCart = async()=>{
        setCartItems([])
        setTotal(0)
    }
    return (
        <CartContext.Provider
            value={{
                cartItems,
                setCartItems,
                total,
                addToCart,
                setAddToCart,
                removeProductFromCart,
                updateQuantity,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
