
import { Link, useLocation } from "react-router-dom";
const NavCategoryCard = ({ category }) => {
    const location = useLocation()
    const path = location.pathname
    const isActive = path === `/categories/${category.slug}/`

    console.log('isActive: ', isActive)
    return (
        <div>
            <Link to={`/categories/${category.slug}/`} >
                <h2
                    className={` rounded-2xl font-medium transition-all duration-200 ${isActive
                            ? "bg-green-800 text-white shadow-md px-4 sm:px-4 py-1 sm:py-2"
                            : "text-gray-600 hover:bg-green-50 hover:text-green-800 px-3 sm:px-4 py-1 sm:py-2"
                        }`}
                >
                    {category.name}
                </h2>
            </Link>
        </div>
    );
};

export default NavCategoryCard;