# Bazar-Sodai — Online Grocery Shop

Bazar-Sodai is a practice-based full-stack e-commerce project that simulates the core functionality of an online grocery store. The project was built to gain hands-on experience with modern frontend development, REST API integration, authentication, cart management, product browsing, checkout workflows, and backend API development.

## Live Demo

**Frontend:**  
https://bazar-sodai-frontend-ten.vercel.app/

**API Base URL:**  
https://bazar-sodai-api.satbeta.top/api/

---

## Project Overview

Bazar-Sodai is an online grocery shopping application built with **React** on the frontend and **Django REST Framework** on the backend.

The application provides essential e-commerce functionality such as:

- Product browsing
- Product search
- Price filtering
- Category-based browsing
- Product details
- Shopping cart management
- Checkout and order placement
- User registration and login
- Product and category APIs
- Local Storage-based cart persistence

The primary goal of this project is to replicate the basic workflow of an online grocery store while gaining practical experience in full-stack web application development.

---

## Features

### Product Management

- Browse available grocery products.
- View detailed information for individual products.
- Search products by name.
- Filter products based on price.
- Browse products by category.
- Fetch product data from the REST API.

### Shopping Cart

- Add products to the shopping cart.
- Remove products from the cart.
- Persist cart data using browser Local Storage.
- Maintain cart data after page refresh.
- Automatically expire cart data after 24 hours.

### Checkout & Order Placement

Users can place an order by providing:

- Name
- Address
- Phone Number

The checkout process provides the following payment options:

- Cash on Delivery
- bKash
- Nagad

A payment method must be selected before placing an order.

### Authentication

The project includes user registration and login functionality using Django's authentication system.

After login, the generated:

- Access Token
- Refresh Token

are stored in Local Storage.

Authentication utility functions are implemented in:

```text
utils/auth.js
```

Available utility functions include:

| Function | Description |
|---|---|
| `saveToken()` | Stores the access token and refresh token in Local Storage |
| `getAccessToken()` | Retrieves the stored access token |
| `getRefreshToken()` | Retrieves the stored refresh token |
| `clearTokens()` | Removes authentication tokens from Local Storage |

---

## Authentication Limitations

Authentication has been implemented, but it is not currently integrated with protected application workflows.

Current limitations:

- No protected pages are connected to the authentication system.
- Order placement does not require authentication.
- Users can place an order without logging in or signing up.
- Authentication is not currently enforced during checkout.

Protected pages and authentication-based order placement can be integrated in future development.

---

## Local Storage & Data Management

### Cart Persistence

Cart information is stored in Local Storage so that cart data remains available after a page refresh.

A **24-hour expiration mechanism** is implemented for the cart.

When the expiration period is reached:

```text
cart
createdAt
```

are removed from Local Storage and the cart is cleared.

### Product Data Storage

Product data is fetched from the API on the homepage and stored in Local Storage.

### Local Storage-based Product Search

Product search uses the product data stored in Local Storage.

### Product Data Updates

Whenever product data is fetched from the API on the homepage, the corresponding product data stored in Local Storage is also updated.

This allows the locally stored product data to remain synchronized with the latest product data fetched from the API.

---

## Product & Category API Access

Session authentication is used for product and category creation APIs.

### Admin Access

Authenticated administrators can:

- Create new products through the Product Create API.
- Create new categories through the Category Create API.

### Non-Admin Access

Non-admin users do not have access to the product and category creation APIs.

---

## Payment System

The checkout page currently provides three payment options:

| Payment Method | Status |
|---|---|
| Cash on Delivery | Available |
| bKash | Option available, no gateway integration |
| Nagad | Option available, no gateway integration |

### Payment Limitations

There is currently no actual payment gateway integration for:

- bKash
- Nagad

Therefore, selecting bKash or Nagad does not process an online payment at this stage.

---

## Product Reviews

Product review submission is not currently implemented.

At present, the product `reviews` field is managed from the Django Admin Panel and represents the review count.

Users cannot currently submit product reviews through the application.

---

# API Documentation

## API Base URL

https://bazar-sodai-api.satbeta.top/api/

---

## Products API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/products/` | Retrieve all products |
| `GET` | `/products/{id}/` | Retrieve a specific product |

### Examples

**All Products**

https://bazar-sodai-api.satbeta.top/api/products/

**Product with ID 5**

https://bazar-sodai-api.satbeta.top/api/products/5

---

## Categories API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/categories/` | Retrieve all categories |
| `GET` | `/categories/{slug}/` | Retrieve a specific category |

### Examples

**All Categories**

https://bazar-sodai-api.satbeta.top/api/categories/

**Egg Category**

https://bazar-sodai-api.satbeta.top/api/categories/egg

---

# Technology Stack

## Frontend

- React
- JavaScript
- React Router DOM
- Tailwind CSS
- DaisyUI
- React Toastify
- React Icons
- Vite

## Backend

- Python
- Django
- Django REST Framework

---

# Project Structure

```text
ecommerce-project-drf-react/
│
├── README.md
├── BANGLA_DESCRIPTION.md
│
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env
│   │
│   ├── backend/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   │
│   ├── store/
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── tests.py
│   │   └── migrations/
│   │
│   └── media/
│       └── products/
│           └── # Product image uploads
│
└── frontend/
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    ├── index.html
    ├── .env
    │
    ├── public/
    │
    └── src/
        ├── App.jsx
        ├── App.css
        ├── main.jsx
        ├── index.css
        ├── assets/
        │
        ├── context/
        │   ├── CartContext.jsx
        │   └── UserContext.jsx
        │
        ├── utils/
        │   └── auth.js
        │
        ├── pages/
        │   ├── HomePage.jsx
        │   ├── ProductDetails.jsx
        │   ├── CategorizedProductsPage.jsx
        │   ├── SearchedProductPage.jsx
        │   ├── CartPages.jsx
        │   ├── CheckoutPage.jsx
        │   ├── LoginPage.jsx
        │   └── SignUpPage.jsx
        │
        └── components/
            ├── CategoryDetails.jsx
            ├── carts/
            ├── checkout/
            ├── homepage/
            ├── loading/
            ├── navbar/
            └── shared/
```

---

# Project Structure Overview

## Backend

The backend is built with Django and Django REST Framework.

| File/Directory | Purpose |
|---|---|
| `manage.py` | Django project management |
| `backend/settings.py` | Project configuration and settings |
| `backend/urls.py` | Main URL configuration |
| `store/models.py` | Database models |
| `store/serializers.py` | API serializers |
| `store/views.py` | API views and business logic |
| `store/urls.py` | Store application URL configuration |
| `store/admin.py` | Django Admin configuration |
| `store/migrations/` | Database migration files |
| `requirements.txt` | Python dependencies |
| `media/products/` | Uploaded product images |

## Frontend

The frontend is developed using React and contains the application's pages, reusable components, contexts, and utilities.

### Pages

```text
HomePage.jsx
ProductDetails.jsx
CategorizedProductsPage.jsx
SearchedProductPage.jsx
CartPages.jsx
CheckoutPage.jsx
LoginPage.jsx
SignUpPage.jsx
```

### Components

```text
components/
├── CategoryDetails.jsx
├── carts/
├── checkout/
├── homepage/
├── loading/
├── navbar/
└── shared/
```

### Context

```text
context/
├── CartContext.jsx
└── UserContext.jsx
```

- `CartContext.jsx` — Manages cart-related state.
- `UserContext.jsx` — Manages user-related context.

### Utilities

```text
utils/
└── auth.js
```

`auth.js` contains the utility functions responsible for storing, retrieving, and clearing authentication tokens.

---

# Current Limitations

The project is currently a practice project and has several limitations.

### Authentication

- Protected pages have not yet been implemented.
- Order placement is not restricted to authenticated users.
- Authentication is not currently connected to the checkout workflow.

### Payment

- No bKash payment gateway integration.
- No Nagad payment gateway integration.
- bKash and Nagad are currently available only as payment options.

### Product Reviews

- Users cannot submit product reviews.
- Review count is currently managed through the Django Admin Panel.

These areas can be extended in future versions of the project.

---

# Project Purpose

Bazar-Sodai was developed as a hands-on practice project to understand and implement the fundamental concepts required for a full-stack e-commerce application.

The project provides practical experience with:

- React application development
- REST API integration
- Django REST Framework
- Authentication and token management
- Local Storage
- Cart state management
- Product and category management
- Search and filtering
- Checkout workflows
- API-based data management
- Admin-controlled content management

---

# Conclusion

Bazar-Sodai is a full-stack practice e-commerce project focused on implementing the core workflow of an online grocery store.

The application currently supports product browsing, product search, price filtering, category-based browsing, product details, cart management, checkout, order placement, and user authentication.

While features such as protected routes, authenticated checkout, user-submitted product reviews, and real payment gateway integration are not currently implemented, the project provides a solid foundation for further development of a complete grocery e-commerce platform.

---

## License

This project is developed as a practice project for learning and experimentation.