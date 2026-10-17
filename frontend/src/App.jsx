import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ProductList from "../pages/ProductList"
import ProductDetails from "../pages/ProductDetails"
import Navbar from '../components/Navbar'
import CartPages from "../pages/cartPages"
import CheckoutPage from "../pages/CheckoutPage"
import PrivateRouter from "../components/PrivateRouter"
import Login from "../pages/Login"
import SignUp from "../pages/Signup"
import NavCategories from "../components/NavCategories"
import HomePage from "../pages/HomePage"



export default function App() {
  return (
    <Router>
      <Navbar></Navbar>

      <NavCategories></NavCategories>

      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<CartPages />}></Route>

        <Route element={<PrivateRouter />}>
          <Route path="/checkout" element={<CheckoutPage />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </Router>
  )
}