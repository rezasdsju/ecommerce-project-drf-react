# Bazar-Sodai — Grocery E-Commerce Platform

Bazar-Sodai is a practice-based full-stack grocery e-commerce project built to simulate the core functionality of an online grocery store.

The project focuses on implementing essential e-commerce features such as product browsing, category-based navigation, product search, price filtering, cart management, order placement, authentication, and API-driven product and category management.

> **Project Type:** Practice Project  
> **Architecture:** Full-Stack Application  
> **Frontend:** React  
> **Backend:** Django REST Framework

---

## Live Demo

**Frontend:**  
https://bazar-sodai-frontend-ten.vercel.app/

**API Base URL:**  
https://bazar-sodai-api.satbeta.top/api/

---

## API Endpoints

### Products

**All Products**
```text
GET /products/
```

https://bazar-sodai-api.satbeta.top/api/products/

**Single Product**
```text
GET /products/{id}/
```

Example:

https://bazar-sodai-api.satbeta.top/api/products/5

### Categories

**All Categories**
```text
GET /categories/
```

https://bazar-sodai-api.satbeta.top/api/categories/

**Single Category**
```text
GET /categories/{slug}/
```

Example:

https://bazar-sodai-api.satbeta.top/api/categories/egg

---

## Features

### Product Management

- Browse available grocery products
- View detailed product information
- Search products by name
- Filter products by price
- Browse products by category
- Fetch product data through REST APIs

### Shopping Cart

- Add products to the cart
- Remove products from the cart
- Persist cart data using Local Storage
- Maintain cart data after page refresh
- Automatically expire stored cart data after 24 hours

### Category-Based Browsing

Users can browse products according to their categories through the navigation menu.

### Order Placement

Users can place an order by providing:

- Name
- Address
- Phone Number

Available payment options:

- Cash on Delivery
- bKash
- Nagad

Users must select a payment option before placing an order.

---

## Authentication

The project uses Django's authentication system to implement user registration and login functionality.

After login, the generated Access Token and Refresh Token are stored in the browser's Local Storage.

Authentication-related utility functions are implemented in:

```text
frontend/src/utils/auth.js
```

### Authentication Utilities

| Function | Description |
|---|---|
| `saveToken()` | Stores Access Token and Refresh Token in Local Storage |
| `getAccessToken()` | Retrieves the stored Access Token |
| `getRefreshToken()` | Retrieves the stored Refresh Token |
| `clearTokens()` | Removes Access Token and Refresh Token from Local Storage |

### Current Authentication Limitations

Authentication is currently implemented but is not fully integrated with protected application flows.

- Login and Signup are not connected to protected pages.
- Order placement does not currently require authentication.
- Users can place orders without logging in or signing up.
- Protected pages have not yet been implemented.
- Authentication has not yet been integrated with the order placement process.

Future development may connect authentication with protected pages and order placement.

---

## Local Storage & Data Management

### Cart Persistence

Cart information is stored in Local Storage so that the cart remains available after a page refresh.

A **24-hour expiration period** is implemented for cart data.

The following Local Storage entries are used:

```text
cart
createdAt
```

When the stored cart exceeds the expiration period, the cart data and its creation timestamp are removed and the cart is cleared.

### Product Data Storage

Product data is fetched from the API on the homepage and stored in Local Storage.

### Local Storage-Based Product Search

Product searches use the product data stored in Local Storage.

### Product Data Updates

Whenever the homepage fetches updated product data from the API, the Local Storage product data is also updated.

This allows the locally stored product information to stay synchronized with the latest data fetched by the homepage.

---

## Product & Category API Access

Product and category creation APIs use **Session Authentication**.

### Admin Access

An authenticated admin can:

- Create new products through the Product Create API
- Create new categories through the Category Create API

### Non-Admin Access

Non-admin users do not have access to these two creation APIs.

---

## Order & Payment System

During checkout, users provide the required delivery information:

- Name
- Address
- Phone Number

The checkout system provides three payment options:

1. Cash on Delivery
2. bKash
3. Nagad

A payment option must be selected before placing an order.

### Payment Limitations

The current project does not include actual online payment gateway integration.

- bKash payment gateway integration has not been implemented.
- Nagad payment gateway integration has not been implemented.
- Selecting bKash or Nagad does not currently process an online payment.

---

## Product Reviews

Product reviews are currently limited.

- There is no user-facing functionality for submitting product reviews.
- The product `reviews` field is currently managed from the Django Admin Panel.
- The review count can be specified from the Admin Panel.

---

## Technology Stack

### Frontend

- React
- JavaScript
- React Router DOM
- Tailwind CSS
- DaisyUI
- React Toastify
- React Icons

### Backend

- Python
- Django
- Django REST Framework

### Data & Storage

- REST API
- Browser Local Storage
- Database managed through Django

---

## Project Structure

The project is organized into two major parts:

- `backend/` — Django and Django REST Framework backend
- `frontend/` — React frontend application

```text
ecommerce-project-drf-react/
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
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── main.jsx
    │   ├── index.css
    │   ├── assets/
    │   ├── context/
    │   └── utils/
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

## Backend Structure

The backend is built with Django and Django REST Framework.

### Core Files

| File / Directory | Purpose |
|---|---|
| `manage.py` | Django project management |
| `backend/settings.py` | Project configuration and settings |
| `backend/urls.py` | Main URL configuration |
| `store/models.py` | Database models |
| `store/serializers.py` | API serializers |
| `store/views.py` | API views and business logic |
| `store/urls.py` | Store application URL configuration |
| `store/admin.py` | Django Admin configuration |
| `store/tests.py` | Backend tests |
| `store/migrations/` | Database migration files |
| `requirements.txt` | Python dependencies |
| `media/products/` | Uploaded product images |

---

## Frontend Structure

The frontend is developed with React and organized around pages, reusable components, contexts, and utility functions.

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

The reusable components are organized into feature-specific directories:

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

`auth.js` contains the authentication token management utilities used for storing, retrieving, and clearing Access and Refresh Tokens.

---

## Media Files

Product images uploaded through the backend are stored in:

```text
backend/media/products/
```

---

## API Reference

### Base URL

```text
https://bazar-sodai-api.satbeta.top/api/
```

### Products API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/products/` | Retrieve all products |
| `GET` | `/products/{id}/` | Retrieve a specific product |

### Categories API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/categories/` | Retrieve all categories |
| `GET` | `/categories/{slug}/` | Retrieve a specific category |

---

## Environment Variables

The project contains environment configuration files for both the backend and frontend:

```text
backend/.env
frontend/.env
```

Environment-specific configuration should be kept inside these files rather than hard-coded into the application.

---

## Project Limitations

Bazar-Sodai is a practice project and currently has several limitations.

### Authentication

- Authentication is not connected to protected pages.
- Order placement does not require authentication.
- Protected routes have not been implemented.

### Payment

- No bKash payment gateway is integrated.
- No Nagad payment gateway is integrated.
- bKash and Nagad selections do not process real online payments.

### Product Reviews

- Users cannot currently submit product reviews.
- Review counts are managed through the Django Admin Panel.

These limitations can be addressed in future iterations of the project.

---

## Future Improvements

Potential future improvements include:

- Implement protected routes.
- Require authentication for order placement.
- Integrate authentication with the checkout process.
- Add real bKash payment gateway integration.
- Add real Nagad payment gateway integration.
- Implement user-submitted product reviews.
- Expand the review and rating system.
- Improve overall e-commerce functionality as the project evolves.

---

## Project Purpose

Bazar-Sodai was developed as a hands-on practice project to gain practical experience in building a full-stack e-commerce application.

The project provides practical experience with:

- React application development
- REST API integration
- Django REST Framework
- Authentication and token management
- React Context API
- Local Storage persistence
- Cart state management
- Product and category management
- Checkout and order workflows
- Frontend and backend project organization

---

## Summary

Bazar-Sodai is a full-stack practice project that demonstrates the core workflow of an online grocery e-commerce platform.

It includes product browsing, category-based navigation, product search, price filtering, cart management, checkout, order placement, authentication, and REST API integration.

While several advanced features such as protected routes, user-generated reviews, and real online payment gateway integration are not yet implemented, the project provides a practical foundation for developing and extending a complete grocery e-commerce platform.

---

## License

This project is developed for practice and learning purposes.