import { use, useState } from "react";
import NavCategoryCard from "./NavCategoryCard";
import { FiChevronDown } from "react-icons/fi";
import { IoChevronUp } from "react-icons/io5";

const Categories = ({ navCategoriesPromise }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const categories = use(navCategoriesPromise)

    const visibleCategories = isExpanded ? categories : categories.slice(0, 4)

    return (
        <div className="px-2 sm:px-5 py-3 border-b border-gray-100 sticky top-0 z-50">


                    <div className="flex items-center gap-5 justify-center">
                        <div className="flex justify-center gap-5 flex-wrap sm:hidden">
                            {
                                visibleCategories.map(category => <NavCategoryCard key={category.id} category={category}></NavCategoryCard>)
                            }
                        </div>
                        <div className="hidden sm:flex justify-center gap-5 flex-wrap  ">
                            {
                                categories.map(category => <NavCategoryCard key={category.id} category={category}></NavCategoryCard>)
                            }
                        </div>
                        <div className="sm:hidden">
                            <span onClick={()=>setIsExpanded(!isExpanded)}>{isExpanded?<IoChevronUp />:<FiChevronDown className="font-bold"/>}</span>
                        </div>
                    </div>
            
        </div>
    );
};

export default Categories;