import { Suspense } from "react"
import Categories from "./Categories"
import ShimmerLoading from "../loading/ShimmerLoading"
const navCategoriesPromise = async()=>{
    const res = await fetch(`${import.meta.env.VITE_DJANGO_BASE_URL}/api/categories/`)
    const data = await res.json()
    return data
}

const NavCategories = () => {
    return (
        <div className="sticky top-0 bg-white z-50">
            <Suspense fallback={<ShimmerLoading></ShimmerLoading>}>
                <Categories navCategoriesPromise={navCategoriesPromise()}></Categories>
            </Suspense>
        </div>
    );
};

export default NavCategories;