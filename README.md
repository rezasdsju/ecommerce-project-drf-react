# 🛒 Bazar Sodai

**Bazar Sodai** is a web-based daily essentials shopping application that allows users to browse essential commodities such as rice, oil, salt, eggs, and fish, manage a shopping cart, and place orders online.

## 🌐 Live Demo

- **Frontend:** [Bazar Sodai](https://bazar-sodai-frontend-ten.vercel.app/)
- **Backend API:** [API Root — Products](https://bazar-sodai-api.satbeta.top/api/products/)
- **Admin Panel:** [Django Administration](https://bazar-sodai-api.satbeta.top/admin/)

## ✨ Features

- **Product Listing:** Browse daily essential products with details in product cards.
- **Product Details:** View detailed information about individual products.
- **Shopping Cart:** Add products to the cart and manage selected items.
- **Quantity Management:** Increase or decrease product quantities.
- **Remove from Cart:** Remove individual products from the cart.
- **Persistent Cart:** Cart data is stored in local storage for 24 hours.
- **Individual Checkout:** Place an order for an individual product.
- **Cart Checkout:** Order multiple products added to the shopping cart.
- **Category Browsing:** Browse products by category.
- **Authentication:** JWT-based authentication support.

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

### Database & Deployment
- PostgreSQL
- Vercel — Frontend Hosting
- Nginx and Gunicorn — Backend Deployment
- HTTPS — Secure API Access

## 🔗 API Endpoints

Base URL: `https://bazar-sodai-api.satbeta.top/api/`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/products/` | Retrieve products |
| GET | `/products/5/` | Retrieve a product by ID |
| GET | `/categories/` | Retrieve categories |
| GET | `/categories/slug/` | Retrieve a category by slug |
| POST | `/categories/order/create/` | Order creation endpoint, as provided |

For complete API behavior, request methods, and required payloads, refer to the backend implementation.

## 📁 Project Structure

```text
ecommerce-project-drf-react/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── backend/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   ├── media/
│   │   └── products/
│   └── store/
│       ├── admin.py
│       ├── models.py
│       ├── serializers.py
│       ├── views.py
│       ├── urls.py
│       └── migrations/
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    ├── components/
    ├── pages/
    ├── public/
    └── src/
        ├── App.jsx
        ├── App.css
        ├── index.css
        ├── main.jsx
        ├── assets/
        ├── context/
        └── utils/
```

## ⚙️ Local Installation & Setup

### Prerequisites

Make sure you have the following installed:

- Python
- Node.js and npm
- PostgreSQL
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/rezasdsju/ecommerce-project-drf-react.git
cd ecommerce-project-drf-react
```

### 2. Set Up the Backend

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

Install the dependencies:

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

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

Configure these variables according to the environment-variable handling implemented in `settings.py`. Never commit real secrets or production database credentials.

### 4. Run Database Migrations

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

### 5. Set Up the Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a frontend `.env` file if your API URL is configured through Vite environment variables. For example:

```env
VITE_BASE_API_URL=http://127.0.0.1:8000/api/
```

Use the exact variable name referenced in your frontend source code.

Start the Vite development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173/`.

## 🔐 Security Notes

- Keep `.env` files and production credentials out of version control.
- Use a strong, private Django `SECRET_KEY`.
- Set `DEBUG=False` in production.
- Restrict allowed hosts and CORS origins to trusted domains.
- Use HTTPS for production API requests.

## 🚀 Deployment

- **Frontend:** [Vercel deployment](https://bazar-sodai-frontend-ten.vercel.app/)
- **Backend:** Django REST Framework served through Gunicorn and Nginx.
- **Database:** PostgreSQL.
- **Media:** Product images served through the backend domain.

## 👨‍💻 Author

**Rezaul Karim Rifat**

- GitHub: [@rezasdsju](https://github.com/rezasdsju)

---

⭐ If you find this project useful, consider giving the repository a star.