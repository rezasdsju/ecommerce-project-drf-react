
import { Link } from "react-router-dom";
const NavCategoryCard = ({category}) => {
    return (
        <div>
            <Link to={`/categories/${category.slug}/`}> <h2>{category.name}</h2></Link>
        </div>
    );
}; 

export default NavCategoryCard;