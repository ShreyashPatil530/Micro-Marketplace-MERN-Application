# Micro Marketplace MERN Application

A complete, production-ready Micro Marketplace built using the MERN stack with JWT authentication, a premium dark UI using Tailwind CSS, and smooth animations with Framer Motion.

## 🚀 Features

- **User Authentication**: Secure JWT-based registration and login system with password hashing.
- **Product Management**: Complete CRUD operations for products (Admin restricted).
- **Advanced Product Discovery**:
  - Global Search by title.
  - Server-side Pagination.
  - Category-based feeling with premium UI.
- **Favorites System**: Add/remove products to personal favorites list (persisted per user).
- **Premium UI/UX**:
  - Modern Dark Theme with Glassmorphism.
  - Micro-interactions (heart animation, hover scales).
  - Responsive design for Mobile & Desktop.
  - Loading states and smooth page transitions.

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Framer Motion, Axios, Lucide React.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Atlas).
- **Auth**: JWT (JSON Web Tokens), Bcrypt.js.

## 📦 Project Structure

```text
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Route logic
│   ├── middleware/     # Auth & Error middlewares
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routes
│   ├── scripts/        # Data seed scripts
│   ├── utils/          # Helper functions
│   └── server.js       # Entry point
└── frontend/
    ├── src/
    │   ├── api/        # Axios configuration
    │   ├── components/ # Reusable UI components
    │   ├── context/    # Auth state management
    │   ├── pages/      # View components
    │   └── App.jsx     # Main routing
```

## ⚙️ Setup Instructions

### 1. Prerequisite
- Node.js installed.
- MongoDB Atlas account (or local MongoDB).

### 2. Backend Setup
1. Navigate to `backend/` folder.
2. Install dependencies: `npm install`.
3. Configure `.env` file (already provided in path).
4. Seed the database with sample products and users:
   ```bash
   npm run data:import
   ```
5. Start the server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Navigate to `frontend/` folder.
2. Install dependencies: `npm install`.
3. Start the React app:
   ```bash
   npm run dev
   ```

## 🔑 Test Credentials

| User Type | Email | Password |
|-----------|-------|----------|
| Admin | `admin@example.com` | `password123` |
| regular | `test@example.com` | `password123` |

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get token

### Products
- `GET /api/products` - Get all products (supports `keyword`, `page`, `limit` query params)
- `GET /api/products/:id` - Get single product details
- `POST /api/products` - Create product (Auth required)
- `PUT /api/products/:id` - Update product (Auth required)
- `DELETE /api/products/:id` - Delete product (Auth required)

### Favorites
- `GET /api/favorites` - Get logged-in user's favorites
- `POST /api/favorites/:id` - Add product to favorites
- `DELETE /api/favorites/:id` - Remove product from favorites

## 🎨 UI Enhancements
- **Glassmorphism**: Translucent panels with background blur.
- **Framer Motion**: Used for product card layouts and favorite heart animations.
- **Tailwind v3**: Customized palette for a sleek obsidian/blue aesthetic.
