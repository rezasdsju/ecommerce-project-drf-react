
import { useNavigate } from 'react-router-dom'
import { useCart } from '../src/context/CartContext';
import { authFetch } from '../src/utils/auth';
import { useState } from 'react';
const CheckoutPage = () => {
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL
    const navigate = useNavigate()
    const { clearCart } = useCart()

    const [form, setForm] = useState({
        name: "",
        address: "",
        phone: "",
        payment_method: 'COD'

    })

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setMessage('')
        try {
            const res = await authFetch(`${BASE_URL}api/orders/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })

            // if (!res.ok){
            //     throw new Error('Failed to fetch order. Please try again')
            // }
            const data = await res.json()
            if (res.ok){
                setMessage('Order placed successfully')
                fetch(`${BASE_URL}/api/cart`)
                clearCart()
                setTimeout(()=>{
                    navigate("/")
                },2000)
            } else {
                setMessage(data.error || "Failed to place order")
            }
        } catch {
            setMessage('An error occured . Please try again')
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <div>
                <h1>Checkout</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name='name'
                        placeholder='Name'
                        value={form.name}
                        onChange={handleChange}
                        required />
                    <textarea

                        name='address'
                        placeholder='Full Address'
                        value={form.address}
                        onChange={handleChange}
                        required />
                    <input
                        type="tel"
                        name='phone'
                        placeholder='Phone Number'
                        value={form.name}
                        onChange={handleChange}
                        required />

                    <select
                        name='payment_method'
                        onChange={handleChange}
                        value={form.payment_method}
                    >
                        <option value="COD">Cash on delivery</option>
                        <option value="CreditCard">Credit Card</option>
                        {/* <option value="PayPal"> Paypal</option> */}
                    </select>
                    <button type='submit' disabled={loading}>{loading ? 'Processing...' : 'Placed Order'}</button>
                    {
                        message && (
                            <p>{message}</p>
                        )
                    }
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;