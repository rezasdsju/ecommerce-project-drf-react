# Bazar-Sodai — অনলাইন গ্রোসারি শপ

**Live Link:** https://bazar-sodai-frontend-ten.vercel.app/

**API Base URL:** https://bazar-sodai-api.satbeta.top/api/

## ১. প্রজেক্ট পরিচিতি (Project Overview)

Bazar-Sodai একটি Practice Project, যা একটি অনলাইন Grocery E-commerce Shop-এর সাধারণ কার্যক্রম অনুসরণ করে তৈরি করা হয়েছে। এই প্রজেক্টে গ্রোসারি শপ পরিচালনার জন্য প্রয়োজনীয় বিভিন্ন ফিচার এবং Business Logic বাস্তবায়নের চেষ্টা করা হয়েছে।

প্রজেক্টটির মূল উদ্দেশ্য হলো একটি অনলাইন গ্রোসারি শপের কার্যপ্রণালি অনুসরণ করে প্রয়োজনীয় ফিচার তৈরি করা এবং হাতে-কলমে অভিজ্ঞতা অর্জন করা।

## ২. বাস্তবায়িত ফিচারসমূহ (Implemented Features)

- **Add to Cart:** পছন্দের পণ্য কার্টে যোগ করা।
- **Remove from Cart:** কার্ট থেকে পণ্য সরিয়ে ফেলা।
- **Product Search:** পণ্যের নাম ব্যবহার করে সার্চ করা।
- **Filter by Price:** পণ্যের দাম অনুযায়ী ফিল্টার করা।
- **Product Details:** প্রতিটি পণ্যের বিস্তারিত তথ্য দেখা।
- **Order Placement:** প্রয়োজনীয় তথ্য দিয়ে অর্ডার প্লেস করা।
- **Category-based Browsing:** নেভিগেশন মেনুর ক্যাটাগরি ব্যবহার করে নির্দিষ্ট ধরনের পণ্য ব্রাউজ করা।

## ৩. Authentication System

Django-এর Authentication ব্যবস্থা ব্যবহার করে User Registration এবং Login-এর ফিচার যুক্ত করা হয়েছে।

Login-এর মাধ্যমে প্রাপ্ত Access Token এবং Refresh Token Local Storage-এ সংরক্ষণ করা হয়। Token সংরক্ষণ, অ্যাক্সেস টোকেন ও রিফ্রেশ টোকেন সংগ্রহ এবং Token মুছে ফেলার জন্য `utils/auth.js` ফাইলে Utility Function তৈরি করা হয়েছে।

ব্যবহৃত Utility Function:

- `saveToken()` — Access Token ও Refresh Token Local Storage-এ সংরক্ষণ করে।
- `getAccessToken()` — সংরক্ষিত Access Token সংগ্রহ করে।
- `getRefreshToken()` — সংরক্ষিত Refresh Token সংগ্রহ করে।
- `clearTokens()` — Local Storage থেকে Access Token ও Refresh Token মুছে ফেলে।

### Authentication-এর সীমাবদ্ধতা

- Login ও Signup-এর সঙ্গে কোনো Protected Page যুক্ত করা হয়নি।
- Order Placement-এর সঙ্গে Authentication System সংযুক্ত করা হয়নি।
- বর্তমানে অর্ডার প্লেস করার জন্য Login বা Signup করা বাধ্যতামূলক নয়।
- ভবিষ্যতে Protected Page এবং Order Placement-এর সঙ্গে Authentication System সংযুক্ত করার বিষয়টি বিবেচনায় রাখা হয়েছে। তবে এই Integration এখনো বাস্তবায়ন করা হয়নি।

## ৪. Local Storage ও Product Data Management

### ৪.১. Cart Persistence

Cart-এর ডেটা Local Storage-এ সংরক্ষণ করা হয়, যাতে পেজ রিফ্রেশ করার পরও সংরক্ষিত Cart Data পাওয়া যায়।

Cart-এর ডেটার জন্য ২৪ ঘণ্টার Expiry ব্যবস্থা রাখা হয়েছে। নির্ধারিত সময় পার হয়ে গেলে Local Storage থেকে `cart` ও `createdAt` সরিয়ে দেওয়া হয় এবং Cart খালি করা হয়।

### ৪.২. Product Data Storage

Homepage-এ API থেকে Product Data Fetch করে Local Storage-এ সংরক্ষণ করা হয়।

### ৪.৩. Local Storage-based Product Search

Product Search করার সময় Local Storage-এ সংরক্ষিত Product Data ব্যবহার করা হয়।

### ৪.৪. Product Data Update

Homepage-এ API থেকে Product Data Fetch হলে Local Storage-এর Product Data-ও আপডেট করা হয়। ফলে Homepage রিফ্রেশ করে নতুন Product Data Fetch হলে Local Storage-এ সংরক্ষিত ডেটাও আপডেট হয়।

## ৫. Product ও Category API Access

Product এবং Category তৈরি করার API-তে Basic Authentication ব্যবহার করা হয়েছে।

- Admin লগইন করে Product Create API ব্যবহার করে নতুন Product যুক্ত করতে পারে।
- Admin লগইন করে Category Create API ব্যবহার করে নতুন Category যুক্ত করতে পারে।
- Non-admin ব্যবহারকারীরা এই দুটি API-তে অ্যাক্সেস পায় না।

## ৬. Order Placement ও Payment System

Order Placement-এর সময় ব্যবহারকারীর কাছ থেকে নিচের তথ্য সংগ্রহ করা হয়:

- Name
- Address
- Phone Number

পেমেন্টের জন্য তিনটি অপশন রাখা হয়েছে:

- Cash on Delivery
- bKash
- Nagad

অর্ডার প্লেস করার আগে ব্যবহারকারীকে যেকোনো একটি Payment Option নির্বাচন করতে হয়।

### Order Placement ও Payment-এর সীমাবদ্ধতা

- bKash-এর জন্য কোনো Payment Gateway Integration করা হয়নি।
- Nagad-এর জন্যও কোনো Payment Gateway Integration করা হয়নি।
- তাই bKash বা Nagad নির্বাচন করলেও বর্তমানে অনলাইন পেমেন্ট সম্পন্ন করার কার্যকরী ব্যবস্থা নেই।

## ৭. Product Review-এর সীমাবদ্ধতা

- ব্যবহারকারীদের কাছ থেকে Product Review সংগ্রহ করার কোনো কার্যকরী ফিচার এখনো যুক্ত করা হয়নি।
- বর্তমানে Admin Panel থেকে Product-এর `reviews` ফিল্ডে রিভিউ সংখ্যা নির্ধারণ করা হয়।

## ৮. API Endpoints

**API Base URL:**  
https://bazar-sodai-api.satbeta.top/api/

### Products API

| কাজ | Endpoint |
|---|---|
| সব Product সংগ্রহ | `GET /products/` |
| নির্দিষ্ট Product সংগ্রহ | `GET /products/{id}/` |

উদাহরণ:

- সব Product: https://bazar-sodai-api.satbeta.top/api/products/
- নির্দিষ্ট Product: https://bazar-sodai-api.satbeta.top/api/products/5

### Categories API

| কাজ | Endpoint |
|---|---|
| সব Category সংগ্রহ | `GET /categories/` |
| নির্দিষ্ট Category সংগ্রহ | `GET /categories/{slug}/` |

উদাহরণ:

- সব Category: https://bazar-sodai-api.satbeta.top/api/categories/
- নির্দিষ্ট Category: https://bazar-sodai-api.satbeta.top/api/categories/egg

## ৯. ব্যবহৃত Technologies

### Frontend

- React
- React Router DOM
- JavaScript
- Tailwind CSS
- DaisyUI
- React Toastify
- React Icons

### Backend

- Python
- Django REST Framework

## ১০. Project Structure

প্রজেক্টটি `backend` এবং `frontend`—এই দুটি প্রধান অংশে বিভক্ত।

### Backend

Backend অংশে Django ও Django REST Framework-সংক্রান্ত ফাইলগুলো রয়েছে।

- `manage.py` — Django Project পরিচালনার জন্য।
- `backend/settings.py` — Project Settings।
- `backend/urls.py` — মূল URL Configuration।
- `store/models.py` — Database Model।
- `store/serializers.py` — Serializer।
- `store/views.py` — API View।
- `store/urls.py` — Store App-এর URL Configuration।
- `store/admin.py` — Django Admin Configuration।
- `store/migrations/` — Database Migration Files।
- `requirements.txt` — Python Dependencies।

### Frontend

Frontend অংশে React-এর Page, Component, Context এবং Utility ফাইলগুলো রয়েছে।

**Pages:**

- `HomePage.jsx`
- `ProductDetails.jsx`
- `CartPages.jsx`
- `CheckoutPage.jsx`
- `CategorizedProductsPage.jsx`
- `SearchedProductPage.jsx`
- `LoginPage.jsx`
- `SignUpPage.jsx`

**Components:**

- `homepage/` — Homepage-সংক্রান্ত Component।
- `carts/` — Cart-সংক্রান্ত Component।
- `checkout/` — Checkout-সংক্রান্ত Component।
- `navbar/` — Navigation ও Category-সংক্রান্ত Component।
- `shared/` — Shared Component।
- `loading/` — Loading Component।

**Context:**

- `CartContext.jsx` — Cart-সংক্রান্ত State Management।
- `UserContext.jsx` — User-সংক্রান্ত Context।

**Utilities:**

- `utils/auth.js` — Token সংরক্ষণ, সংগ্রহ ও মুছে ফেলার Utility Function।

এছাড়া Frontend অংশে `App.jsx`, `main.jsx`, `App.css`, `index.css`, `vite.config.js` এবং `package.json`-এর মতো প্রয়োজনীয় ফাইল রয়েছে।

### Media Files

Backend-এর `media/products/` ডিরেক্টরিতে আপলোড করা Product Image রাখা হয়।

## ১১. সারসংক্ষেপ

Bazar-Sodai একটি Practice Project, যেখানে অনলাইন গ্রোসারি শপের Product Browsing, Cart Management, Product Search, Price Filtering, Category-based Browsing, Order Placement এবং Authentication-এর মতো ফিচার বাস্তবায়ন করা হয়েছে।

প্রজেক্টটিতে কিছু সীমাবদ্ধতাও রয়েছে। Authentication এখনো Protected Page বা Order Placement-এর সঙ্গে সংযুক্ত নয়, Product Review সংগ্রহের ফিচার নেই এবং bKash ও Nagad-এর Payment Gateway Integration করা হয়নি।
