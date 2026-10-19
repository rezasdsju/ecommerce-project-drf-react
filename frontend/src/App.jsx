import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
// import ProductList from "../components/ProductList"
import ProductDetails from "../pages/ProductDetails"
import Navbar from '../components/navbar/Navbar'
import CartPages from "../pages/CartPages"
import CheckoutPage from "../pages/CheckoutPage"
import PrivateRouter from "../components/PrivateRouter"
import Login from "../pages/Login"
import SignUp from "../pages/Signup"
import NavCategories from "../components/navbar/NavCategories"
import HomePage from "../pages/HomePage"
import CategorizedProductsPage from "../pages/CategorizedProductsPage"


export default function App() {
  return (
    <Router>
      <Navbar></Navbar>

      <NavCategories></NavCategories>

      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<CartPages />}></Route>
        <Route path="/categories/:slug" element={<CategorizedProductsPage/>}></Route>
        {/* <Route element={<PrivateRouter />}> */}
          <Route path="/checkout" element={<CheckoutPage />}></Route>
        {/* </Route> */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </Router>
  )
}