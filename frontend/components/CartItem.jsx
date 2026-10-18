import { HiMiniMinusSmall } from "react-icons/hi2";
import { HiMiniPlusSmall } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";

const CartItem = ({ product }) => {

    return (
        <div className="grid grid-cols-12 gap-3 border border-gray-200 rounded-2xl px-2 py-4">
            <div className="col-span-2 bg-gray-100 border border-gray-200 px-2 py-4 rounded-2xl flex items-center justify-center">
                <img src={product.image} alt={product.name} width={60} height={60}  />
            </div>
            <div className="col-span-8 space-y-3">
                <h2 className="font-bold text-xl">{product.name}</h2>
                <div className='flex items-center flex-wrap gap-2'>
                    {
                        product.tags.map((tag, index) => <p className={`${index % 3 === 0 ? 'bg-purple-100' : index % 3 === 1 ? 'bg-red-50' : 'bg-green-100'} rounded-xl px-3 py-1`}>{tag}</p>)
                    }

                </div>
                <div className="flex items-center gap-3">
                    <span>< HiMiniMinusSmall/></span>
                    <span><HiMiniPlusSmall /></span>
                    <span><MdDelete /></span>
                    <span><FaRegBookmark /></span>
                </div>
            </div>
            <div className="col-span-2">
                <p>130 Taka</p>
                <p>130 Taka</p>
            </div>
        </div>
    );
};

export default CartItem;