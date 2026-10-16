import { use } from "react";


const Categories = ({navCategoriesPromise}) => {
    const categories = use(navCategoriesPromise)
    return (
        <div>
            <h1>{categories.name}</h1>
        </div>
    );
};

export default Categories;