
import { use, useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import ProductCard from "./shared/ProductCard";
import { Link } from "react-router-dom";


const CategoryDetails = ({ category }) => {
    // const category = use(categorizedProductsPromise)
    console.log('category: ', category)
    const products = category.products
    console.log('products: ', products)
    console.log('First product image:', products[0]?.image);

    const [filter, setFilter] = useState('default')
    // const [sortedProducts, setSortedProducts] = useState([...products]) 
    const sortProducts = (products) => {
        const productsToSort = [...products]
        if (filter === 'default') {
            return productsToSort
        }
        if (filter === 'lowToHigh') {

            productsToSort.sort((a, b) => Number(a.current_price) - Number(b.current_price))
        }
        if (filter === 'highToLow') {
            productsToSort.sort((a, b) => Number(b.current_price) - Number(a.current_price))

        }
        return productsToSort
    }
    const sortedProducts = sortProducts(products)
    return (
        <div>
            <div className="flex items-center gap-0.5 mx-2 sm:mx-8 my-4">
                <Link to={`/`}><span>হোম</span></Link>
                <span><IoChevronForward /></span>
                <span>{category.category}</span>
            </div>

            <div className="flex items-center justify-between border border-gray-200 px-2 py-3 rounded-2xl  mx-2 sm:mx-8 ">
                <div>
                    <div className="flex flex-col ">
                        <span>{category.category}</span>
                        <span>{products.length} টি পণ্য</span>
                    </div>
                </div>
                <div className="flex  items-center justify-center  gap-2">
                    <div>
                        <span>সাজান</span>
                    </div>

                    <div>
                        <select onChange={(e) => setFilter(e.target.value)} defaultValue="default" className="select select-neutral w-35">
                            {/* <option value={`filter`} disabled>ফিল্টার</option> */}
                            <option value={`default`}>ডিফল্ট</option>
                            <option value={`lowToHigh`}>দাম কম থেকে বেশি</option>
                            <option value={`highToLow`}>দাম বেশি থেকে কম</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-3 p-1 sm:p-6">
                {
                    sortedProducts.map(product => <ProductCard key={product.id} product={product}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default CategoryDetails