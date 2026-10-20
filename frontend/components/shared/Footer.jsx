import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { CiLink } from "react-icons/ci";
import { BiCategoryAlt } from "react-icons/bi";
import { IoCall } from "react-icons/io5";
import { PiLineVertical } from "react-icons/pi";
import { Link } from "react-router-dom";
import FooterLogo from '../../public/bazar-sodai-footer-logo.jpg'
import { useEffect, useState } from "react";

const Footer = () => {
    const [categories, setCategories] = useState(null);
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(`${import.meta.env.VITE_DJANGO_BASE_URL}/api/categories/`);
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await res.json();
            setCategories(data);
        };
        fetchCategories();
    }, []);

    console.log('categories from footer: ', categories);
    return (
<footer className="bg-linear-to-b from-green-50 to-emerald-100/60 border-t border-green-100 mt-12 pt-10 text-gray-700">
  {/* Main Footer Content */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
      

      <div className="flex flex-col space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-white border border-green-200 rounded-2xl p-2 shadow-sm">
            <img src={FooterLogo} alt="Bazar Sodai Logo" className="h-10 w-10 object-contain rounded-xl" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl text-green-800 tracking-tight">বাজার-সদাই</span>
            <span className="text-xs font-medium bg-linear-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
              সেরা দামে টাটকা বাজার
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">
          আপনার নিত্যপ্রয়োজনীয় পণ্য এখন আপনার ঘরের দোরগোড়ায়। তাজা পণ্য, সাশ্রয়ী দাম এবং নির্ভরযোগ্যতা আমাদের অঙ্গীকার।
        </p>

        {/* Feature Badges */}
        <div className="grid grid-cols-3 gap-2 pt-2 text-center">
          <div className="flex flex-col items-center bg-white/70 p-2 rounded-xl border border-green-100 shadow-xs hover:bg-white transition-all">
            <span className="text-xl mb-1">🍃</span>
            <span className="text-xs font-semibold text-gray-700">তাজা পণ্য</span>
          </div>
          <div className="flex flex-col items-center bg-white/70 p-2 rounded-xl border border-green-100 shadow-xs hover:bg-white transition-all">
            <span className="text-xl mb-1">🚚</span>
            <span className="text-xs font-semibold text-gray-700">দ্রুত ডেলিভারি</span>
          </div>
          <div className="flex flex-col items-center bg-white/70 p-2 rounded-xl border border-green-100 shadow-xs hover:bg-white transition-all">
            <span className="text-xl mb-1">💸</span>
            <span className="text-xs font-semibold text-gray-700">নিরাপদ পেমেন্ট</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 bg-green-100 text-green-700 rounded-lg text-lg"><CiLink /></span>
          <h2 className="text-lg font-bold text-gray-800">দ্রুত লিংক</h2>
        </div>
        <ul className="space-y-2 text-sm font-medium">
          <li>
            <Link to={`/`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-green-600 transition-colors inline-block py-1">
              হোম
            </Link>
          </li>
          <li>
            <span onClick={() => document.getElementById('all-products')?.scrollIntoView({ behavior: "smooth" })} className="hover:text-green-600 transition-colors cursor-pointer inline-block py-1">
              সকল পণ্য
            </span>
          </li>
          <li>
            <Link to="/about" className="hover:text-green-600 transition-colors inline-block py-1">
              আমাদের সম্পর্কে
            </Link>
          </li>
        </ul>
      </div>

  
      <div className="flex flex-col space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 bg-green-100 text-green-700 rounded-lg text-lg"><BiCategoryAlt /></span>
          <h2 className="text-lg font-bold text-gray-800">পণ্যের ক্যাটাগরি</h2>
        </div>
        <ul className="space-y-2 text-sm font-medium">
          <li><Link to="/categories/shak_sobji/" className="hover:text-green-600 transition-colors inline-block py-0.5">শাকসবজি</Link></li>
          <li><Link to="/categories/rice/" className="hover:text-green-600 transition-colors inline-block py-0.5">চাল ও আটা</Link></li>
          <li><Link to="/categories/fish_meat/" className="hover:text-green-600 transition-colors inline-block py-0.5">মাছ ও মাংস</Link></li>
          <li><Link to="/categories/dal/" className="hover:text-green-600 transition-colors inline-block py-0.5">ডাল</Link></li>
          <li><Link to="/categories/oil/" className="hover:text-green-600 transition-colors inline-block py-0.5">তেল</Link></li>
          <li><Link to="/categories/mosola/" className="hover:text-green-600 transition-colors inline-block py-0.5">মসলা</Link></li>
        </ul>
      </div>

   
      <div className="flex flex-col space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 bg-green-100 text-green-700 rounded-lg text-lg"><IoCall /></span>
          <h2 className="text-lg font-bold text-gray-800">যোগাযোগ</h2>
        </div>
        <div className="text-sm space-y-2 text-gray-600">
          <p className="flex items-center gap-2">📍 ঢাকা, বাংলাদেশ</p>
          <p className="flex items-center gap-2">📞 <a href="tel:01722222220" className="hover:text-green-600 transition-colors">01722222220</a></p>
          <p className="flex items-center gap-2">✉️ <a href="mailto:bazarsodai@gmail.com" className="hover:text-green-600 transition-colors">bazarsodai@gmail.com</a></p>
        </div>

        {/* Social Links */}
        <div className="pt-2 border-t border-green-200/60 mt-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">আমাদের সাথে থাকুন</h3>
          <div className="flex items-center gap-3 text-xl text-gray-600">
            <a href="#" className="p-2 bg-white rounded-full border border-gray-200 shadow-xs hover:text-blue-600 hover:border-blue-600 transition-all">
              <FaFacebookSquare />
            </a>
            <a href="#" className="p-2 bg-white rounded-full border border-gray-200 shadow-xs hover:text-pink-600 hover:border-pink-600 transition-all">
              <FaSquareInstagram />
            </a>
            <a href="#" className="p-2 bg-white rounded-full border border-gray-200 shadow-xs hover:text-red-600 hover:border-red-600 transition-all">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>


  <div className="bg-green-950 text-emerald-100 py-4 border-t border-green-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
      <div className="flex items-center gap-1.5 font-medium">
        <span>© {new Date().getFullYear()}</span>
        <span className="font-bold text-white">Bazar-Sodai</span>
        <span>— সর্বস্বত্ব সংরক্ষিত</span>
      </div>

      <div className="flex items-center gap-3 text-xs sm:text-sm text-emerald-200/80">
        <a href="#" className="hover:text-white transition-colors">প্রাইভেসি পলিসি</a>
        <span className="text-emerald-700">|</span>
        <a href="#" className="hover:text-white transition-colors">শর্তাবলী</a>
        <span className="text-emerald-700">|</span>
        <a href="#" className="hover:text-white transition-colors">সহায়তা ডেস্ক</a>
      </div>
    </div>
  </div>
</footer>
    );
};

export default Footer;