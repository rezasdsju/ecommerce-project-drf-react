# 🛒 Bazar Sodai — Frontend

A grocery shopping web app built with React, Vite, and DaisyUI.

## 🌐 Live Demo

[Visit Bazar Sodai](https://bazar-sodai-frontend-ten.vercel.app/)

## ✨ Features

- Browse products and categories
- View product details
- Add and remove cart items
- Increase or decrease product quantities
- Persistent cart using local storage (24 hours)
- Individual product and cart checkout
- Login and signup pages
- JWT authentication support

## 🛠️ Technologies

- React
- Vite
- JavaScript
- React Router DOM
- DaisyUI
- React Icons
- React Toastify
- Context API

## 📁 Project Structure

```text
frontend/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .env
├── .gitignore
├── .oxlintrc.json
├── README.md
├── public/
│   ├── bazar-sodai-footer-logo.jpg
│   ├── favicon-2.jpg
│   ├── favicon.jpg
│   ├── favicon.svg
│   └── icons.svg
├── components/
│   ├── CategoryDetails.jsx
│   ├── carts/
│   │   ├── CartItem.jsx
│   │   ├── OrderSummary.jsx
│   │   └── OrderSummaryProductItemCard.jsx
│   ├── checkout/
│   │   ├── CartItemForCheckout.jsx
│   │   └── OrderSummaryForCheckOutPage.jsx
│   ├── homepage/
│   │   ├── Banner.jsx
│   │   └── ProductList.jsx
│   ├── loading/
│   │   ├── ProgressBarLoading.jsx
│   │   ├── ShimmerLoading.jsx
│   │   ├── SkeletonLoading.jsx
│   │   └── SkeletonLoadingForProductList.jsx
│   ├── navbar/
│   │   ├── Categories.jsx
│   │   ├── NavCategories.jsx
│   │   ├── NavCategoryCard.jsx
│   │   └── Navbar.jsx
│   └── shared/
│       ├── Footer.jsx
│       ├── ProductCard.jsx
│       └── ScrollToTop.jsx
├── pages/
│   ├── CartPages.jsx
│   ├── CategorizedProductsPage.jsx
│   ├── CheckoutPage.jsx
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── ProductDetails.jsx
│   ├── SearchedProductPage.jsx
│   └── SignUpPage.jsx
└── src/
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── main.jsx
    ├── assets/
    │   ├── banner-bazar-sodai.jfif
    │   ├── hero.png
    │   ├── react.svg
    │   └── vite.svg
    ├── context/
    │   ├── CartContext.jsx
    │   └── UserContext.jsx
    └── utils/
        └── auth.js
```

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/rezasdsju/ecommerce-project-drf-react.git
cd ecommerce-project-drf-react/frontend
```

Install dependencies:

```bash
npm install
```

## 🔐 Environment Variables

Create a `.env` file inside the `frontend/` directory.

### Local Development

```env
VITE_DJANGO_BASE_URL=http://127.0.0.1:8000
VITE_DJANGO_BASE_API_URL=http://127.0.0.1:8000/api/
```

### Production

```env
VITE_DJANGO_BASE_URL=https://bazar-sodai-api.satbeta.top
VITE_DJANGO_BASE_API_URL=https://bazar-sodai-api.satbeta.top/api/
```

## 🚀 Run Locally

```bash
npm run dev
```

## 📦 Build for Production

```bash
npm run build
```

## 👨‍💻 Author

**Rezaul Karim Rifat**

[GitHub](https://github.com/rezasdsju)