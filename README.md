# Knit_Finance - Notes API with Authentication

This project is a **Scalable Web Application** implementing **Note CRUD operations** along with **Authentication & Authorization**.  
It uses **Node.js, Express.js, and MongoDB** for backend, and includes structured error handling and response formatting.

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
   - MVC structure: Controllers, Models, Routes, and Middlewares are separated.
   - Async handling with `asyncHandler`.
   - RESTful API design principles followed.

---

### Live Link: https://knit-finance-assignment.vercel.app

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
**Response:**
```json
{
  "statusCode": 201,
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "64fe2b90...",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### 🔹 Login User
**Endpoint:** `POST /api/v1/users/login`  
**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  }
}
```

### 🔹 Refresh Access Token
**Endpoint:** `POST /api/v1/users/refresh-token`  
**Body:**
```json
{
  "refreshToken": "jwt_refresh_token"
}
```
**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "New access token generated",
  "data": {
    "accessToken": "new_jwt_access_token"
  }
}
```

### 🔹 Logout User (Protected)
**Endpoint:** `POST /api/v1/users/logout`  
**Headers:**
```
Authorization: Bearer <access_token>
```
**Response:**
```json
{
  "statusCode": 200,
  "success": true,
  "message": "User logged out successfully"
}
```

### 🔹 Change Password (Protected)
**Endpoint:** `POST /api/v1/users/change-password`  
**Headers:**
```
Authorization: Bearer <access_token>
```
**Body:**
```json
{
  "oldPassword": "password123",
  "newPassword": "newPassword456"
}
```

### 🔹 Get Current User (Protected)
**Endpoint:** `GET /api/v1/users/current-user`  
**Headers:**
```
Authorization: Bearer <access_token>
```

### 🔹 Update Account Details (Protected)
**Endpoint:** `PATCH /api/v1/users/update-account`  
**Headers:**
```
Authorization: Bearer <access_token>
```
**Body:**
```json
{
  "username": "new_username",
  "email": "new_email@example.com"
}
```

---

## 📝 Notes CRUD API

### 🔹 Create Note
**Endpoint:** `POST /api/v1/notes/create`  
**Headers:**
```
Authorization: Bearer <access_token>
```
**Body:**
```json
{
  "title": "My First Note",
  "content": "This is a sample note."
}
```

### 🔹 Get All Notes
**Endpoint:** `GET /api/v1/notes`  
**Headers:**
```
Authorization: Bearer <access_token>
```

### 🔹 Update Note
**Endpoint:** `PATCH /api/v1/notes/update/:id`  
**Headers:**
```
Authorization: Bearer <access_token>
```
**Body:**
```json
{
  "title": "Updated Note",
  "content": "Updated content"
}
```

### 🔹 Delete Note
**Endpoint:** `DELETE /api/v1/notes/delete/:id`  
**Headers:**
```
Authorization: Bearer <access_token>
```

---

## ⚡ Error Response Format
All errors follow a consistent format:
```json
{
  "statusCode": 400,
  "success": false,
  "message": "Validation error",
  "errors": []
}
```

---

## 🔧 Setup Instructions
1. Clone repo:
   ```bash
   git clone https://github.com/your-repo/knit_finance.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup `.env` file with:
   ```
   MONGO_URI=your_mongo_url
   JWT_SECRET=your_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   PORT=5000
   ```
4. Run project:
   ```bash
   npm run dev
   ```

---

## 📌 Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT (Authentication)
- Postman (API Testing)

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
- `POST /api/v1/users/refresh-token` → refresh token get new Access token
- `POST /api/v1/users/logout` → logout user
- `POST /api/v1/users/change-password` → change current password
- `GET /api/v1/users/current-user` → get current user
- `PATCH /api/v1/users/update-account` → update Account Details


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
