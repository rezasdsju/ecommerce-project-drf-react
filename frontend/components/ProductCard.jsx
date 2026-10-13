
const ProductCard = ({product}) => {
    return (
        <div>
            {
                product.image && <img 
                src={`${import.meta.env.VITE_BASE_URL}${product.image}`} 
                alt={product.name} 
             
                className="w-full h-56 object-cover rounded-lg mb-4"/>
            }
            <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
            <p className="text-gray-200 mt-2">{product.price}</p>
        </div>
    );
};

export default ProductCard;