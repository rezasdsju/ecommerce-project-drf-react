import { useContext } from "react";
import { IoChevronForwardSharp } from "react-icons/io5";
import { CartContext } from "../src/context/CartContext";
import CartItem from "../components/carts/CartItem";
import OrderSummary from "../components/carts/OrderSummary";
import { Link } from "react-router-dom";

const cartPages = () => {
    const { cartItems } = useContext(CartContext)
    const currentItem = []
    return (

        <div className="my-10 mx-5">
            <div className="flex items-center gap-1 mb-5">
                <Link to={`/`}><span>হোম</span></Link>
                <span><IoChevronForwardSharp /></span>
                <span>কার্ট</span>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12  gap-4 ">
                <div className="col-span-1 sm:col-span-8 border border-gray-200 rounded-2xl px-2 py-2">

                    <div className="bg-white   p-2">
                        <h2 className="text-2xl font-bold text-gray-800">শপিং কার্ট</h2>
                        <p className="text-gray-500 text-sm mt-1">
                            আপনার নির্বাচিত পণ্যগুলো পর্যালোচনা করুন এবং পরবর্তী ধাপে এগিয়ে যান।
                        </p>
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