import { useContext } from "react";
import { CartContext } from "../src/context/CartContext";
import ProductCard from "../components/shared/ProductCard";

import { useState } from "react";
import { Link } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";


const SearchedProductPage = () => {
    const { searchedResult } = useContext(CartContext)
    const { textInSearchBox } = useContext(CartContext)

    const [filter, setFilter] = useState('default')


    const sortProducts = (searchedProducts) => {
        const productsToSort = [...searchedProducts]
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
    const sortedProducts = sortProducts(searchedResult)
    return (
        <div >
            <div className="mx-10 my-4 flex items-center">
                <Link to={`/`}><span >হোম</span></Link>
                <span><IoChevronForward /></span>
                <span>সার্চ করা পণ্য</span>
            </div>

            {
                sortedProducts.length > 0 &&
                <div className="flex items-center justify-between border border-gray-200 px-2 py-3 rounded-2xl  mx-2 sm:mx-8 ">
                    <div>
                        <div className="flex flex-col ">
                            {sortedProducts.length} টি পণ্য পাওয়া গিয়েছে
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
            }
            <div>
                {
                    sortedProducts.length > 0 ?
                        <div className="grid grid-cols-2   md:grid-cols-3 lg:grid-cols-4 gap-3 p-1 sm:p-6 ">
                            {
                                sortedProducts.map(product => <ProductCard key={product.id} product={product}></ProductCard>)
                            }
                        </div> :

                        <div>
                            {
                                (!textInSearchBox || textInSearchBox.length < 1) ?
                                    <div className="flex items-center justify-center my-20 text-2xl ">
                                        কোন পণ্য সার্চ করা হয় নি
                                    </div> :
                                    <div className="flex items-center justify-center my-20 text-2xl text-red-600">
                                        কোন পণ্য পাওয়া যায় নি
                                    </div>
                            }
                        </div>


                }
            </div>
        </div>
    );
};

export default SearchedProductPage;