
import BannerImage from '../src/assets/banner-bazar-sodai.jfif'
const Banner = () => {
    return (
        <div className='grid sm:grid-cols-2 mx-2 sm:mx-10 my-10 border border-gray-100 rounded-2xl px-2 min-[400px]:px-5 py-5 min-[400px]:py-10 gap-4'>
            <div className='space-y-4'>
                <h2 className='text-3xl font-bold bg-linear-to-r from-blue-500 to-green-400 bg-clip-text text-transparent'>বাজার-সদাই</h2>
                <p className='text-2xl font-semibold bg-linear-to-r from-red-400 to-purple-500 bg-clip-text text-transparent'>আপনার নিত্যপ্রয়োজনীয় পণ্য এখন আপনার ঘরের দোরগোড়ায়</p>
                <p>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম সহ অসংখ্য নিত্য পণ্য পাচ্ছেন একদম তাজা ও সাশ্রয়ী মূলে</p>
                <button className='bg-green-700 px-5 py-2 text-white rounded-2xl'>সব পণ্য দেখুন</button>
            </div>
            <div className='flex items-center justify-center bg-linear-to-br from-red-50 to-green-50 rounded-2xl py-5'>
                <img src={BannerImage} alt="Banner" height={400} width={350} className='rounded-xl'/>
            </div>
        </div>
    );
};

export default Banner;