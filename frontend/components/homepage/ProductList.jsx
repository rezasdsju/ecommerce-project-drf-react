import { useEffect, useState } from "react";
import ProductCard from "../shared/ProductCard";
import SkeletonLoadingForProductList from "../loading/SkeletonLoadingForProductList";
const ProductList = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    

    useEffect(()=>{
        const fetchProducts = async()=>{
            fetch(`${import.meta.env.VITE_DJANGO_BASE_API_URL}products/`)
            .then((response)=>{
                if (!response.ok){
                    throw new Error('Failed to fetch products')
                }
                return response.json()
            })
            .then((data)=>{
                setProducts(data)
                localStorage.setItem('products',JSON.stringify(data))
                setLoading(false)
            })
            .catch((error)=>{
                setError(error.message)
                setLoading(false)
            })
        }
        fetchProducts()

    },[])

    if (loading){
        return <SkeletonLoadingForProductList></SkeletonLoadingForProductList>
    }
    if (error){
        return <div>Error: {error}</div>
    }
    return (
        <div className="mx-1 sm:mx-4" id="all-products">
            <h1 className="text-3xl font-bold text-center my-8 bg-white ">সকল পণ্য</h1>
            <div className="grid grid-cols-2   md:grid-cols-3 lg:grid-cols-4 gap-3 p-1 sm:p-6 ">
                {
                    products.length>0 ? products.map(product=>{
                       return <ProductCard key={product.id} product={product}></ProductCard>
                    }) :
                    <p>No Products available</p>
                }
            </div>
        </div>
    );
};

export default ProductList;