# 📘 knit_finance API Documentation

This repository contains the **Notes API** for the `knit_finance` assignment.  
The project demonstrates a **secure and scalable web application** with **user authentication** and full **CRUD operations** on Notes.

---

## 🎯 Assignment Overview
The goal of this assignment is to build a **scalable web application** with the following features:

1. **Authentication & Authorization**
   - Secure login and signup using JWT tokens.
   - Middleware (`verifyToken`) to protect private routes.

2. **Notes Management (CRUD)**
   - Create a new note.
   - Fetch all notes created by the logged-in user.
   - Update an existing note (only by the owner).
   - Delete a note (only by the owner).

3. **Error Handling**
   - Custom error responses using `ApiError` and `ApiResponse`.
   - Handles unauthorized access with friendly messages (`Please sign up or login`).

4. **Scalability & Clean Code**
   - MVC structure: Controllers, Models, Routes, and Middlewares separated.
   - Async handling with `asyncHandler`.
   - RESTful API design principles followed.

---

## 📌 Features
- User Authentication (Register, Login, Logout)
- JWT-based Protected Routes
- Access & Refresh Token Flow
- Password Management
- CRUD APIs for Notes
- Structured API Response using `ApiResponse` and `ApiError`

---

## 🚀 Authentication & Authorization

### 🔹 Register User
**Endpoint:** `POST /api/v1/users/register`  
**Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

## 🚀 Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (Access & Refresh tokens)
- **Tools**: Postman for API testing & documentation

---

## 📌 How to Use
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/knit_finance.git
   cd knit_finance
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_access_secret
   REFRESH_TOKEN_SECRET=your_refresh_secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_EXPIRY=7d
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

5. Open Postman and test the endpoints.

---

## 📂 API Endpoints

### Auth Routes
- `POST /api/v1/users/register` → Register a new user
- `POST /api/v1/users/login` → Login user and get tokens

### Notes Routes (Protected)
- `POST /api/v1/notes/create` → Create a note
- `GET /api/v1/notes/` → Get all notes for logged-in user
- `PATCH /api/v1/notes/update/:id` → Update a note by ID
- `DELETE /api/v1/notes/delete/:id` → Delete a note by ID

---

## ⚠️ Important
Every request to `/api/v1/notes` requires authentication.  
If no token is provided, the response will be:
```json
{
  "statusCode": 401,
  "message": "Please sign up or login",
  "success": false
}
```

---

## 📜 License
This project is licensed under the MIT License.
