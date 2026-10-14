import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ProductList from "../pages/ProductList"
import ProductDetails from "../pages/ProductDetails"
export default function App(){
  return (
<Router>
  <Routes>
    <Route path="/" element={<ProductList/>}></Route>
    <Route path="/product/:id" element={<ProductDetails/>}></Route>
  </Routes>
</Router>
  )
}