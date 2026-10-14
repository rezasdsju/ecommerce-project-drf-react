import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const {id} = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL

    useEffect(()=>{
        fetch(`${BASE_URL}/api/products/${id}/`)
        .then(response=>{
            if (!response.ok){
                throw new Error('Failed to fetch product detail')
            }
            return response.json()
        })
        .then(data=>{
            setProduct(data)
            setLoading(false)
        })
        .catch(error=>{
            setError(error.message)
            setLoading(false)
        })
    }, [id,BASE_URL])
    if (loading){
        return <div>Loading...</div>
    }
    if (error){
        return <div>Error: {error}</div>
    }
    if (!product){
        return <div>No Product Found</div>
    }
    return (
        <div>
            <div>
               <div>
                 <img src={`${BASE_URL}${product.image}`} alt={product.name} 
                 className='w-full md:w-1/2 h-auto object-cover rounded-lg'/>
               </div>

               <div>
                <h1>{product.name}</h1>
                <p>{product.price}</p>
                <p>{product.description}</p>
               </div>
               <button>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductDetails;