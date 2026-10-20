
import { Link, useLocation } from "react-router-dom";
const NavCategoryCard = ({category}) => {
    const location = useLocation()
    console.log('location: ',location)
    return (
        <div>
            <Link to={`/categories/${category.slug}/`}> <h2>{category.name}</h2></Link>
        </div>
    );
}; 

export default NavCategoryCard;