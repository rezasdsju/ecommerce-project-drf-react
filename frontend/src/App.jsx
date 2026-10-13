import { useState, useEffect } from "react"


function App(){
  const [products, setProducts] = useState([])
  useEffect(()=>{
    fetch(`${import.meta.env.VITE_BASE_API_URL}products/`)
    .then(res=>res.json())
    .then(data=>setProducts(data))
    .catch(error=> console.log('Error fething massage: ',error))
  },[])
  // console.log('products: ',products)
  // console.log(products.map(product => product.image))
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <h1>Product List</h1>
      <div>
        {
          products.map(product=> <div key={product.slug}>
            <h2 className="text-2xl">{product.name}</h2>
            <p>{product.category.name}</p>
            <p>{product.price}</p>
            {
              product.image && <>
              {/* <p>{`${import.meta.env.VITE_BASE_URL}${product.image}`}</p> */}
              <img src={`${import.meta.env.VITE_BASE_URL}${product.image}`} alt={product.name} height={20} width={20}/>
              </>
            }
          </div>)
        }
      </div>
    </div>
  )
}

export default App;