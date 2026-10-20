import { BrowserRouter, Route, Routes } from "react-router-dom"
// import ProductList from "../components/ProductList"
import ProductDetails from "../pages/ProductDetails"
import Navbar from '../components/navbar/Navbar'
import CartPages from "../pages/CartPages"
import CheckoutPage from "../pages/CheckoutPage"
import PrivateRouter from "../components/PrivateRouter"
import LoginPage from "../pages/LoginPage"
import SignUpPage from "../pages/SignUpPage"
import NavCategories from "../components/navbar/NavCategories"
import HomePage from "../pages/HomePage"
import CategorizedProductsPage from "../pages/CategorizedProductsPage"
import Footer from "../components/Footer"
// import { BrowserRouter } from "react-router-dom"
import ScrollToTop from "../components/ScrollToTop"
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* <Router> */}
        <Navbar></Navbar>

        <NavCategories></NavCategories>

        <Routes>
          <Route path="/" element={<HomePage />}></Route>

          <Route path="/product/:id" element={<ProductDetails />}></Route>
          <Route path="/cart" element={<CartPages />}></Route>
          <Route path="/categories/:slug" element={<CategorizedProductsPage />}></Route>
          {/* <Route element={<PrivateRouter />}> */}
          <Route path="/checkout" element={<CheckoutPage />}></Route>
          {/* </Route> */}
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
        </Routes>
        <Footer></Footer>
      {/* </Router> */}
    </BrowserRouter>
  )
}