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
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.js
├── components/
│   ├── Banner.jsx
│   ├── CartItem.jsx
│   ├── CartItemForCheckout.jsx
│   ├── CategoryDetails.jsx
│   ├── OrderSummary.jsx
│   ├── OrderSummaryForCheckOutPage.jsx
│   ├── OrderSummaryProductItemCard.jsx
│   ├── PrivateRouter.jsx
│   ├── ProductCard.jsx
│   ├── ProductList.jsx
│   └── navbar/
│       ├── Categories.jsx
│       ├── NavCategories.jsx
│       ├── NavCategoryCard.jsx
│       └── Navbar.jsx
├── pages/
│   ├── CartPages.jsx
│   ├── CategorizedProductsPage.jsx
│   ├── CheckoutPage.jsx
│   ├── HomePage.jsx
│   ├── Login.jsx
│   ├── ProductDetails.jsx
│   └── Signup.jsx
├── public/
│   ├── favicon-2.jpg
│   ├── favicon.jpg
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── assets/
    │   ├── banner-bazar-sodai.jfif
    │   ├── hero.png
    │   ├── react.svg
    │   └── vite.svg
    ├── context/
    │   └── CartContext.jsx
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