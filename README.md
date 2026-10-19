# 🛒 Bazar Sodai

Bazar Sodai is a web-based daily essentials shopping application that allows users to browse everyday commodities such as rice, oil, salt, eggs, and fish, manage their shopping cart, and place orders online.

## 🌐 Live Demo

- **Frontend:** [Bazar Sodai](https://bazar-sodai-frontend-ten.vercel.app/)
- **Backend API:** [Products API](https://bazar-sodai-api.satbeta.top/api/products/)


## ✨ Features

- **Product Listing:** Browse daily essential products displayed in product cards.
- **Product Details:** View detailed information about individual products.
- **Category Browsing:** Browse products by category.
- **Shopping Cart:** Add products to the cart and manage selected items.
- **Quantity Management:** Increase or decrease product quantities.
- **Remove Products:** Remove individual products from the cart.
- **Persistent Cart:** Cart data is stored in browser local storage for 24 hours.
- **Individual Checkout:** Place an order for an individual product.
- **Cart Checkout:** Place an order for products added to the shopping cart.
- **JWT Authentication:** Support for JSON Web Token-based authentication.

## 🛠️ Technologies Used

### Frontend
- React
- JavaScript
- React Router DOM
- DaisyUI
- React Icons
- React Toastify

### Backend
- Python
- Django
- Django REST Framework
- JWT Authentication

### Database and Deployment
- PostgreSQL
- Vercel — Frontend Hosting
- Gunicorn — Django Application Server
- Nginx — Web Server and Reverse Proxy
- HTTPS — Secure API Communication

## 🔗 API Endpoints

**Base URL:** `https://bazar-sodai-api.satbeta.top/api/`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/products/` | Retrieve the product list |
| GET | `/products/5/` | Retrieve a product by ID |
| GET | `/categories/` | Retrieve all categories |
| GET | `/categories/slug/` | Retrieve category information by slug |
| POST | `/categories/order/create/` | Order creation endpoint |

The HTTP methods and endpoint purposes above follow the supplied project information. Check the backend URL configuration for the exact supported behavior.

## 📁 Project Structure

```text
ecommerce-project-drf-react/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── backend/
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── media/
│   │   └── products/
│   └── store/
│       ├── __init__.py
│       ├── admin.py
│       ├── apps.py
│       ├── models.py
│       ├── serializers.py
│       ├── tests.py
│       ├── urls.py
│       ├── views.py
│       └── migrations/
└── frontend/
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    ├── index.html
    ├── components/
    ├── pages/
    ├── public/
    └── src/
        ├── App.css
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        ├── assets/
        ├── context/
        └── utils/
```

## ⚙️ Installation and Setup

### Prerequisites

Make sure you have installed:

- Python
- Node.js and npm
- PostgreSQL
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/rezasdsju/ecommerce-project-drf-react.git
cd ecommerce-project-drf-react
```

### 2. Configure the Backend

Navigate to the backend directory:

```bash
cd backend
python -m venv venv
```

Activate the virtual environment.

**Windows PowerShell:**

```powershell
.\venv\Scripts\Activate.ps1
```

**Linux/macOS:**

```bash
source venv/bin/activate
```

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

### 3. Configure Backend Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
SECRET_KEY=your-django-secret-key
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost

DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=127.0.0.1
DB_PORT=5432

MEDIA_URL=/media/
MEDIA_ROOT=media
```

Configure the variables according to your Django settings and local PostgreSQL database. Never commit real credentials or production secrets.

### 4. Apply Database Migrations

```bash
python manage.py migrate
```

Create an administrator account if needed:

```bash
python manage.py createsuperuser
```

Start the Django development server:

```bash
python manage.py runserver
```

The backend will be available at `http://127.0.0.1:8000/`.

### 5. Configure the Frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/` with the following variables:

```env
VITE_DJANGO_BASE_URL=http://127.0.0.1:8000
VITE_DJANGO_BASE_API_URL=http://127.0.0.1:8000/api/
```

These variables configure the Django backend base URL and API base URL for the frontend.

Start the Vite development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173/`.

## 🔐 Security Notes

- Keep `.env` files and credentials out of version control.
- Use a strong, private Django `SECRET_KEY`.
- Set `DEBUG=False` in production.
- Configure `ALLOWED_HOSTS` and CORS for trusted domains only.
- Use HTTPS for production API communication.
- Never expose database credentials in frontend code.

## 🚀 Deployment

- **Frontend:** [Vercel](https://bazar-sodai-frontend-ten.vercel.app/)
- **Backend:** Django REST Framework with Gunicorn and Nginx.
- **Database:** PostgreSQL.
- **Media Files:** Product images served through the backend domain over HTTPS.

For production, configure the frontend environment variables with the deployed API URLs:

```env
VITE_DJANGO_BASE_URL=https://bazar-sodai-api.satbeta.top
VITE_DJANGO_BASE_API_URL=https://bazar-sodai-api.satbeta.top/api/
```

## 👨‍💻 Author

**Rezaul Karim Rifat**

- GitHub: [@rezasdsju](https://github.com/rezasdsju)

---

If you find this project useful, consider giving the repository a ⭐ on GitHub.