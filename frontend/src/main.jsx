import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import App from './App.jsx'
import CartProvider from './context/CartContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App />
      <ToastContainer />
    </CartProvider>
  </StrictMode>,
)
