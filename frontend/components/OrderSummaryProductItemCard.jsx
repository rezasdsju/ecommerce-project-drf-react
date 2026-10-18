import { useContext } from "react";
import { CartContext } from "../src/context/CartContext";
import { TbCurrencyTaka } from "react-icons/tb";

const OrderSummaryCard = ({ product }) => {
    const { cartItems } = useContext(CartContext)
    const totalItems = cartItems.filter((item) => item.id === product.id).length
    return (
        <div className="py-2">
            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700 font-medium truncate max-w-37.5">{product.name}</span>
                <span className="flex items-center gap-2">
                    <span className="text-gray-500">({totalItems} {product.unit})</span>
                    <span className="flex items-center font-semibold text-gray-800">
                        <span>{product.current_price * totalItems}</span>
                        <span><TbCurrencyTaka className="text-base" /></span>
                    </span>
                </span>
            </div>
        </div>
    );
};

export default OrderSummaryCard;