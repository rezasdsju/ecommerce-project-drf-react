
import { createContext, useState, useContext, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState(()=>{
        const savedCart = localStorage.getItem('cart')
        return savedCart? JSON.parse(savedCart):[]
    });

    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cartItems))
    },[cartItems])


    return (
        <CartContext.Provider
            value={{
                cartItems,
                setCartItems,

            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
