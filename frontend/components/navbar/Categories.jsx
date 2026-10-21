import { use, useState } from "react";
import NavCategoryCard from "./NavCategoryCard";
import { FiChevronDown } from "react-icons/fi";
import { IoChevronUp } from "react-icons/io5";


const Categories = ({ navCategoriesPromise }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const categories = use(navCategoriesPromise)

    const visibleCategories = isExpanded ? categories : categories.slice(0, 4)
    const visibleCategoriesForWideScreen = isExpanded ? categories : categories.slice(0, 10)

    return (
        <div className=" px-2 sm:px-5 py-3 border-b border-gray-100 ">


            <div className="flex items-center gap-5 justify-center">
                <div className="flex justify-center gap-0 flex-wrap sm:hidden">
                    {
                        visibleCategories.map(category => <NavCategoryCard key={category.id} category={category} ></NavCategoryCard>)
                    }
                </div>
                <div className="hidden sm:flex justify-center gap-0 flex-wrap  ">
                    {
                        visibleCategoriesForWideScreen.map(category => <NavCategoryCard key={category.id} category={category}></NavCategoryCard>)
                    }
                </div>
                <div className={`${categories.length < 10 && 'sm:hidden'}`}>
                    <span onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? <IoChevronUp /> : <FiChevronDown className="font-bold" />}</span>
                </div>
            </div>

        </div>
    );
};

export default Categories;