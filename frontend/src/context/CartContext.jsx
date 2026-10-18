
import { createContext, useState, useContext, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [isCartChecked, setIsCartChecked] = useState(false)
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart')
        return savedCart ? JSON.parse(savedCart) : []
    });

    useEffect(() => {
       if (isCartChecked){
         localStorage.setItem('cart', JSON.stringify(cartItems))
       }
    }, [cartItems,isCartChecked])

    useEffect(() => {

        const EXPIRY_TIME = 24 * 60 * 60 * 1000
        const createdAt = Number(localStorage.getItem('createdAt'))
        console.log(createdAt)
        const nowTime = Number(Date.now())

        if (createdAt) {
            if (nowTime - createdAt >= EXPIRY_TIME) {
                localStorage.removeItem('cart')
                localStorage.removeItem('createdAt')
                setCartItems([])
                
            }
        }
        setIsCartChecked(true)
    }, [])


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
