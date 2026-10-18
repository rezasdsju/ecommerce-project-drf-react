import { useContext } from "react";
import { IoChevronForwardSharp } from "react-icons/io5";
import { CartContext } from "../src/context/CartContext";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
const cartPages = () => {
    const { cartItems } = useContext(CartContext)
    const currentItem = []
    return (

        <div className="my-10 mx-5">
            <div className="flex items-center gap-1 mb-5">
                <span>হোম</span>
                <span><IoChevronForwardSharp /></span>
                <span>কার্ট</span>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12  gap-4 ">
                <div className="col-span-1 sm:col-span-8 border border-gray-200 rounded-2xl px-2 py-2">

                    <div>
                        <h2>আপনার শপিং কার্ট</h2>
                        <p>চেক আউট করার পূর্বে দেখে নিন সব ঠিক ঠাক আছে কিনা।</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        {
                            cartItems.map((item) => {
                                if (!currentItem.includes(item.id)) {
                                    currentItem.push(item.id)
                                    return <CartItem key={item.id} product={item}></CartItem>

                                }

                            })
                        }
                    </div>
                </div>
                <div className="col-span-1 sm:col-span-4">
                    <OrderSummary></OrderSummary>
                </div>
            </div>
        </div>
    );
};

export default cartPages;