import { useContext, useState } from "react";
import { CartContext } from "../../src/context/CartContext";

import { Link } from "react-router-dom";
const OrderSummaryForCheckOutPage = ({ product, quantity, setQuantity }) => {
    const [paymentMethod, setPaymentMethod] = useState('')
    const { cartItems } = useContext(CartContext)

    const orderedProducts = [{product_id:product.id,product_quantity:quantity}]
    const handleDeliveryDataSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const deliveryData = Object.fromEntries(formData.entries())

        deliveryData.paymentMethod = paymentMethod


        const res = await fetch(`${import.meta.env.VITE_DJANGO_BASE_URL}/api/orders/create/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ordered_products:orderedProducts, delivery_info:deliveryData})
        })
        const result =await res.json()


    }
    return (
        <div className="border border-gray-100 bg-white shadow-sm p-5 rounded-2xl space-y-5">
            <form onSubmit={handleDeliveryDataSubmit}>

                <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                        <span className="font-semibold text-gray-700">ডেলিভারির ঠিকানা</span>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">নাম</label>
                            <input name="customer_name" type="text" placeholder="জলিল খাঁ" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500 transition" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">বাসা ও রাস্তার ঠিকানা</label>
                            <input name="address" type="text" placeholder="বাড়ি ১২, রোড ৫, মিরপুর-১০" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500 transition" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">ফোন</label>
                            <input name="phone" type="text" placeholder="0172222xxxxx" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500 transition" required />
                        </div>
                    </div>
                </div>

                <div className="space-y-2 pt-2">
                    <span className="font-semibold text-gray-700 block">Payment</span>
                    <div className="flex items-center gap-2 flex-wrap">
                        <button type="button" onClick={() => setPaymentMethod('cod')} className={` ${paymentMethod === 'cod' ? 'border border-green-500 bg-green-50 text-green-700' : 'border border-gray-200'}   font-medium rounded-xl px-3 py-1.5 text-sm cursor-pointer`}>
                            ক্যাশ অন ডেলিভারি
                        </button>
                        <button type="button" onClick={() => setPaymentMethod('bcash')} className={` ${paymentMethod === 'bcash' ? 'border border-green-500 bg-green-50 text-green-700' : 'border border-gray-200'}  hover:border-gray-400 text-gray-600 rounded-xl px-3 py-1.5 text-sm cursor-pointer transition`}>
                            বিকাশ
                        </button>
                        <button type="button" onClick={() => setPaymentMethod('nogod')} className={`${paymentMethod === 'nogod' ? 'border border-green-500 bg-green-50 text-green-700' : 'border border-gray-200'}  hover:border-gray-400 text-gray-600 rounded-xl px-3 py-1.5 text-sm cursor-pointer transition`}>
                            নগদ
                        </button>
                    </div>
                </div>

                <div className="pt-2">
                    <button type="submit" className="bg-green-700 hover:bg-green-800 transition w-full py-3 rounded-2xl text-white font-bold cursor-pointer shadow-sm">
                        অর্ডার সম্পন্ন করুন
                    </button>
                </div>
            </form>
            <div className="text-center pt-1">
                <Link to={`/`}><span className="text-sm text-gray-500 hover:text-green-600 cursor-pointer transition underline">কেনাকাটা চালিয়ে যান</span></Link>
            </div>
        </div>
    );
};

export default OrderSummaryForCheckOutPage;