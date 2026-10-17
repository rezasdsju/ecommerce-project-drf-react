import { use } from "react";
import NavCategoryCard from "./NavCategoryCard";

const Categories = ({navCategoriesPromise}) => {
    const categories = use(navCategoriesPromise)
    console.log('categories: ',categories)
    return (
        <div className="px-5 py-5 sticky top-0 z-50">
            {/* <h1>Categories: {categories.length}</h1> */}
            <div className="flex justify-center gap-5 flex-wrap">
                {
                    categories.map(category=><NavCategoryCard key={category.id} category={category}></NavCategoryCard>)
                }
            </div>
        </div>
    );
};

export default Categories;