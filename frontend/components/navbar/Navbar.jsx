import { Link, useNavigate } from "react-router-dom";

import { clearTokens, getAccessToken } from "../../src/utils/auth";
import { IoCartOutline } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../../src/context/CartContext";
import { UserContext } from "../../src/context/UserContext";

import { RxTriangleDown } from "react-icons/rx";
import NavLogo from '../../public/bazar-sodai-footer-logo.jpg'
import { IoSearch } from "react-icons/io5";

const Navbar = () => {
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const {textInSearchBox,setTextInSearchBox} = useContext(CartContext)
    const { setSearchedResult } = useContext(CartContext)
    console.log('textInSearchBox: ',textInSearchBox)
    const { userName } = useContext(UserContext)
    const { cartItems } = useContext(CartContext)
    const navigate = useNavigate()

    const profileMenuRef = useRef(null)
    // const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
    const isLoggenIn = !!getAccessToken()
    const handleLogOut = () => {
        clearTokens()
        navigate('/login')
    }

    useEffect(() => {
        document.addEventListener('click', (event) => {
            // setShowProfileMenu(false)
            console.log('event: ', event.target)
            console.log(profileMenuRef.current.contains(event.target))
            if (!profileMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false)
            }
        })
    }, [])




    const uniqueIds = []
    const uniqueCartProducts = cartItems.filter(product => {
        if (!uniqueIds.includes(product.id)) {
            uniqueIds.push(product.id)
            return true
        } else {
            return false
        }
    })
    // console.log('uniqueCartProducts: ',uniqueCartProducts)

    const savedProducts = JSON.parse(localStorage.getItem('products'))
    // console.log('savedProducts: ',savedProducts)
    const handleSearch = (searchedProduct) => {
        // console.log('search text: ',searchedProduct)
        if (searchedProduct.length < 1) {
            setSearchedResult([])
            setTextInSearchBox(searchedProduct)
            return
        }
        const filteredProducts = savedProducts.filter(product => product.name.toLowerCase().includes(searchedProduct.toLowerCase()))
        // console.log('filteredProducts: ',filteredProducts)
        setSearchedResult([...filteredProducts])
        setTextInSearchBox(searchedProduct)
    }


    const handleNavigateToSearchPage = () => {
        navigate('/search')
    }
    return (
        <div className="border-b border-gray-100 ">
            <nav className="flex items-center justify-between  px-2 py-4 max-w-6xl mx-auto">

                <div className="flex items-center">
                    <Link
                        to="/"
                        className="text-2xl font-bold bg-linear-to-r from-green-600 via-emerald-500 to-yellow-500 bg-clip-text text-transparent"
                    >
                        <div className="flex items-center gap-2">
                            <div className="bg-gray-50 border border-green-200 rounded-xl p-2 shadow-sm">
                                <img src={NavLogo} alt="Bazar Sodai Logo" className="h-5 w-5 object-contain rounded-xl" />
                            </div>
                            <span> বাজার-সদাই</span>
                        </div>
                    </Link>
                </div>






                {/* <div className="hidden sm:block"> */}
                <div className="flex items-center justify-center">
                    <div onClick={() => navigate('/search')} className="hidden sm:block">
                        <label className="input">

                            <input onChange={(e) => handleSearch(e.target.value)} type="search" required placeholder="সার্চ..." />
                            <button onClick={handleNavigateToSearchPage} className="cursor-pointer transition-transform duration-200 hover:scale-150"><span><IoSearch /></span></button>
                        </label>
                    </div>
                </div>




                <div className="flex items-center justify-center gap-1 min-[400px]:gap-3">
                    <div>
                        {
                            isLoggenIn ?
                                <>

                                    <div ref={profileMenuRef}>
                                        <div onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-1 cursor-pointer">
                                            <span>Welcome! {userName}</span>
                                            <span><RxTriangleDown /></span>
                                        </div>


                                        {
                                            showProfileMenu && <div className="absolute top-10 right-4  border border-green-200 z-9999  bg-gray-100  rounded-2xl px-10 py-5">
                                                <div>
                                                    <button onClick={() => { handleLogOut(); setShowProfileMenu(!showProfileMenu) }} className="cursor-pointer">সাইন আউট</button>
                                                </div>
                                            </div>
                                        }
                                    </div>



                                </> :
                                <div className="flex items-center justify-center gap-1 min-[400px]:gap-3">
                                    <Link to="/login" className="bg-white border border-gray-200 rounded-xl px-2 min-[400px]:px-4 py-2 text-black font-bold">সাইন ইন</Link>
                                    <Link to="/signup" className="bg-blue-100 text-black border border-gray-100 rounded-xl px-2 min-[400px]:px-4 py-2 font-bold">সাইন আপ</Link>
                                </div>
                        }
                    </div>

                    <Link
                        to="/cart"
                        className="flex items-center gap-0 min-[400px]:gap-2 px-0 py-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-700 hover:text-green-600 font-semibold relative"
                    >

                        <div className="relative flex items-center">
                            <IoCartOutline className="text-2xl" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                                    {uniqueCartProducts.length}
                                </span>
                            )}
                        </div>
                        <span className="text-sm font-bold">কার্ট</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;