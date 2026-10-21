### Authentication System

Django-এর Token Authentication ব্যবহার করে User Registration ও Login-এর functionality যুক্ত করা হয়েছে। Login-এর মাধ্যমে প্রাপ্ত Access Token এবং Refresh Token Local Storage-এ সংরক্ষণ করা হয়। সংরক্ষিত Token পরবর্তীতে প্রয়োজন অনুযায়ী ব্যবহার করার জন্য `saveToken()` এবং `getAccessToken()`-এর মতো utility function তৈরি করা হয়েছে।

### Limitations

- Login ও Signup functionality-এর সঙ্গে কোনো Protected Page যুক্ত করা হয়নি।
- Order Placement-এর সঙ্গে Authentication System সংযুক্ত করা হয়নি। ফলে বর্তমানে Login বা Signup করা Order Placement-এর পূর্বশর্ত নয়।
- Authentication System-টি ভবিষ্যতে Protected Page এবং Order Placement-এর সঙ্গে সংযুক্ত করার সম্ভাবনা বিবেচনায় রেখে তৈরি করা হয়েছে। তবে এই integration এখনো বাস্তবায়ন করা হয়নি।
utils/auth.js
```
export const saveToken = (token)=>{
    // console.log('token.access: ',token.access)
    // console.log('token.refresh: ',token.refresh)
    localStorage.setItem('access_token',token.access)
    localStorage.setItem('refresh_token',token.refresh)
}


export const getAccessToken = ()=>{
    const token = localStorage.getItem('access_token')

    // console.log('get access token: ',token)
    return token
}

export const getRefreshToken = ()=>{
    const token = localStorage.getItem('refresh_token')
    // console.log('refreshToken: ',token)
    return token
}



export const clearTokens = ()=>{
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
}
```



### Local Storage ও Product Data Management

- **Cart Persistence:** Cart-এর ডেটা Local Storage-এ ২৪ ঘণ্টার জন্য সংরক্ষণ করার ব্যবস্থা করা হয়েছে।
```
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart')
        return savedCart ? JSON.parse(savedCart) : []
    });

    useEffect(() => {
       if (isCartChecked){
         localStorage.setItem('cart', JSON.stringify(cartItems))
       }
    }, [cartItems,isCartChecked])

    useEffect(() => {

        const EXPIRY_TIME = 24 * 60 * 60 * 1000
        const createdAt = Number(localStorage.getItem('createdAt'))
        console.log(createdAt)
        const nowTime = Number(Date.now())

        if (createdAt) {
            if (nowTime - createdAt >= EXPIRY_TIME) {
                localStorage.removeItem('cart')
                localStorage.removeItem('createdAt')
                setCartItems([])
                
            }
        }
        setIsCartChecked(true)
    }, [])
```
- **Product Data Storage:** Homepage-এ API থেকে Product Data Fetch করে Local Storage-এ সংরক্ষণ করা হয়।
```
    useEffect(()=>{
        const fetchProducts = async()=>{
            fetch(`${import.meta.env.VITE_DJANGO_BASE_API_URL}products/`)
            .then((response)=>{
                if (!response.ok){
                    throw new Error('Failed to fetch products')
                }
                return response.json()
            })
            .then((data)=>{
                setProducts(data)
                localStorage.setItem('products',JSON.stringify(data))
                setLoading(false)
            })
            .catch((error)=>{
                setError(error.message)
                setLoading(false)
            })
        }
        fetchProducts()

    },[])
```
- **Local Storage-based Product Search:** Product Search করার সময় Local Storage-এ সংরক্ষিত Product Data ব্যবহার করা হয়।
- **Product Data Update:** Homepage-এর Product Data প্রতিবার Fetch হলে Local Storage-এর Product Data-ও আপডেট করা হয়। ফলে Homepage রিফ্রেশ করে নতুন Product Data Fetch হলে Local Storage-এর ডেটাও আপডেট হয়।
### Project Overview

এটি একটি Practice Project হলেও, বাস্তব জীবনের চাহিদা পূরণের বিষয়টি বিবেচনায় রেখে তৈরি করা হয়েছে। একটি Grocery E-commerce Shop অনলাইনে পরিচালনা করার জন্য প্রয়োজনীয় বিভিন্ন ফিচার ও বাস্তবসম্মত ব্যবসায়িক লজিক (Business Logic) ইমপ্লিমেন্ট করার চেষ্টা করা হয়েছে।

প্রজেক্টটিতে একটি অনলাইন গ্রোসারি শপের সাধারণ কার্যক্রম পরিচালনার জন্য প্রয়োজনীয় ফিচারগুলো যুক্ত করা হয়েছে। যেমন:

- **Add to Cart:** পছন্দের পণ্য কার্টে যোগ করা।
- **Remove from Cart:** কার্ট থেকে পণ্য সরিয়ে ফেলা।
- **Product Search:** পণ্যের নাম দিয়ে সার্চ করা।
- **Filter by Price:** পণ্যের দাম অনুযায়ী ফিল্টার করা।
- **Product Details:** প্রতিটি পণ্যের বিস্তারিত তথ্য দেখা।
- **Order Placement:** প্রয়োজনীয় তথ্য দিয়ে অর্ডার প্লেস করা।
- **Category-based Browsing:** নেভিগেশন মেনুর ক্যাটাগরি ব্যবহার করে নির্দিষ্ট ধরনের পণ্য ব্রাউজ করা।


সামগ্রিকভাবে, এই প্রজেক্টের মূল লক্ষ্য হলো একটি বাস্তবসম্মত Grocery E-commerce Shop-এর কার্যপ্রণালি অনুসরণ করে প্রয়োজনীয় ফিচার ও বিজনেস লজিক বাস্তবায়নের মাধ্যমে হাতে-কলমে অভিজ্ঞতা অর্জন করা।

### Authentication ও API Access

Basic Authentication ব্যবহার করা হয়েছে, যাতে শুধুমাত্র Admin লগইন করে Product এবং Category Create API-তে অ্যাক্সেস পেতে পারে এবং নতুন Product ও Category যুক্ত করতে পারে। Non-admin ব্যবহারকারীরা এই দুটি API-তে অ্যাক্সেস পাবে না।

### Limitations

- ব্যবহারকারীদের কাছ থেকে Product Review সংগ্রহ করার কোনো কার্যকরী ফিচার (Functionality) এখনো যুক্ত করা হয়নি।
- বর্তমানে Admin Panel থেকে সরাসরি Product-এর `reviews` ফিল্ডে রিভিউ সংখ্যা নির্ধারণ করা হয়েছে।
- bKash ও Nagad-এর জন্য এখনো কোনো Payment Gateway ইন্টিগ্রেশন করা হয়নি। তাই এই দুটি অপশন নির্বাচন করলেও অনলাইন পেমেন্ট সম্পন্ন করার কার্যকরী ফিচার বর্তমানে নেই।


### Order Placement ও Payment System

Order placement-এর সময় ব্যবহারকারীর কাছ থেকে Name, Address এবং Phone Number সংগ্রহ করা হয়। পেমেন্টের জন্য Cash on Delivery, bKash এবং Nagad—এই তিনটি অপশন রাখা হয়েছে। অর্ডার প্লেস করার আগে ব্যবহারকারীকে অবশ্যই যেকোনো একটি পেমেন্ট অপশন নির্বাচন করতে হয়।

### Limitations

- bKash ও Nagad-এর জন্য এখনো কোনো Payment Gateway ইন্টিগ্রেশন করা হয়নি। তাই এই দুটি অপশন নির্বাচন করলেও অনলাইন পেমেন্ট সম্পন্ন করার কার্যকরী ফিচার বর্তমানে নেই।



**Base URL:** `https://bazar-sodai-api.satbeta.top/api/`



get products:
https://bazar-sodai-api.satbeta.top/api/products/


individual product
https://bazar-sodai-api.satbeta.top/api/products/${id}
https://bazar-sodai-api.satbeta.top/api/products/5

get categories:
https://bazar-sodai-api.satbeta.top/api/categories/

individual categories:
https://bazar-sodai-api.satbeta.top/api/categories/$slug{}
https://bazar-sodai-api.satbeta.top/api/categories/egg


