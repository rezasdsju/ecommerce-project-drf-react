
const OrderSummary = () => {
    return (
        <div className="border border-gray-200 px-3 py-2 rounded-2xl">
            <div className="flex items-center justify-between">
                <span className="text-xl font-bold">Order Summary</span>
                <span>3 Items</span>
            </div>
            <div className="flex items-center justify-between">
                <span>subtotal</span>
                <span>300</span>
            </div>
            <div className="flex items-center justify-between">
                <span>tax</span>
                <span>2</span>
            </div>
            <div className="flex items-center justify-between">
                <span>cupon</span>
                <span>200</span>
            </div>
            <div className="flex items-center justify-between">
                <span>Total</span>
                <span>5000</span>
            </div>
            <div className="flex items-center justify-between">
                <span>duo10</span>
                <span>apply</span>
            </div>
            <div>Applied DU10</div>
            <div className="flex items-center justify-between">
                <span>shipping address</span>
                <span>Edit</span>
            </div>
            <div>
                <input type="text" name="" id="" placeholder="Full Name" />
                <input type="text" name="" id="" placeholder="Street" />
                <input type="text" placeholder="Phone" />
            </div>
            <div>
                <p className="bg-black  py-2 border rounded-2xl text-white font-bold mx-auto"><span className="flex items-center justify-center">Save Address</span></p>
            </div>

            <span>Payment</span>
            <div className="flex items-center gap-2">
                <button className="border border-red-300 rounded-xl px-2 py-1">Card</button>
                <button className="border border-red-300 rounded-xl px-2 py-1">Bcash</button>
                <button className="border border-red-300 rounded-xl px-2 py-1">Nogod</button>
            </div>
            <div>
                <p className="bg-black  py-2 border rounded-2xl text-white font-bold mx-auto"><span className="flex items-center justify-center">Checkout</span></p>
            </div>

            <div className="text-center">
                <span>Continue Shopping</span>
            </div>
        </div>
    );
};

export default OrderSummary;