import { useContext, useEffect, useState } from "react";
import { IoChevronForwardSharp } from "react-icons/io5";
import { CartContext } from "../src/context/CartContext";
// import CartItem from "../components/checkout/CartItem";
// import OrderSummary from "../components/carts/OrderSummary";
import { useSearchParams } from "react-router-dom";
import OrderSummaryForCheckOutPage from "../components/checkout/OrderSummaryForCheckOutPage";
import CartItemForCheckout from "../components/checkout/CartItemForCheckout";
import { Link } from "react-router-dom";
import ProgressBarLoading from "../components/loading/ProgressBarLoading";
const CheckoutPage = () => {
    const [quantity, setQuantity] = useState(1)
    const { cartItems } = useContext(CartContext)
    const [searchParams] = useSearchParams()
    const productId = searchParams.get('productId')
    console.log('productId: ', productId)
    const currentItem = []
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;
    useEffect(() => {
        if (!productId) {
            setLoading(false);
            return;
        }
        setLoading(true)
        fetch(`${BASE_URL}/api/products/${productId}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch product detail');
                }
                return response.json();
            })
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [productId, BASE_URL]);

    if (loading) {
        return <ProgressBarLoading></ProgressBarLoading>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!product) {
        return <div>No Product Found</div>;
    }
    return (

        <div className="my-10 mx-5">
            <div className="flex items-center gap-1 mb-5">
                <Link to={`/`}><span>হোম</span></Link>
                <span><IoChevronForwardSharp /></span>
                <Link to={`/product/${product.id}`}><span>পণ্যের বিবরণ</span></Link>
         
                <span><IoChevronForwardSharp /></span>

                <span>চেকআউট</span>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12  gap-4 ">
                <div className="col-span-1 sm:col-span-8 border border-gray-200 rounded-2xl px-2 py-2">

                    <div className="my-3">
                        <h2 className="text-xl font-bold ">অর্ডার পর্যালোচনা করুন</h2>
                        <p className="text-neutral-500"> আপনার নির্বাচিত পণ্য, পরিমাণ ও মূল্য যাচাই করে অর্ডার সম্পন্ন করুন।</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        {/* {
                            cartItems.map((item) => {
                                if (!currentItem.includes(item.id)) {
                                    currentItem.push(item.id)
                                    return <CartItem key={item.id} product={item}></CartItem>

                                }

                            })
                        } */}
                        <CartItemForCheckout product={product} quantity={quantity} setQuantity={setQuantity}></CartItemForCheckout>
                    </div>

                    {/* {
                        cartItems.length > 0 &&
                        <div className="flex items-center justify-center my-10">
                            <button className="bg-black text-white font-bold px-10 py-2 border rounded-2xl cursor-pointer active:scale-95 transition-transform duration-150">কার্টে থাকা পণ্য অর্ডার করুন</button>
                        </div>
                    } */}
                </div>
                <div className="col-span-1 sm:col-span-4">
                    <OrderSummaryForCheckOutPage product={product} quantity={quantity} setQuantity={setQuantity}></OrderSummaryForCheckOutPage>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;