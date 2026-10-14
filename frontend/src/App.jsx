import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ProductList from "../pages/ProductList"
import ProductDetails from "../pages/ProductDetails"
import Navbar from '../components/Navbar'
import CartPages from "../pages/cartPages"
export default function App(){
  return (
<Router>
  <Navbar></Navbar>
  <Routes>
    <Route path="/" element={<ProductList/>}></Route>
    <Route path="/product/:id" element={<ProductDetails/>}></Route>
    <Route path="/cart" element={<CartPages/>}></Route>
  </Routes>
</Router>
  )
}