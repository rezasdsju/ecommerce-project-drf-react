import { Suspense } from "react"
import Categories from "./Categories"
const navCategoriesPromise = async()=>{
    const res = await fetch(`${import.meta.env.VITE_DJANGO_BASE_URL}/api/categories/`)
    const data = await res.json()
    return data
}

const NavCategories = () => {
    return (
        <div>
            {/* <h2>Nav Categories</h2> */}
            <Suspense fallback='Loading Categories...'>
                <Categories navCategoriesPromise={navCategoriesPromise()}></Categories>
            </Suspense>
        </div>
    );
};

export default NavCategories;