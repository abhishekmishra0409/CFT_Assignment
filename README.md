# 🔐 Full-Stack Authentication System – Signup, Login, Forgot & Reset Password

This is a **MERN stack** (MongoDB, Express.js, React.js, Node.js) full-stack authentication system that includes user signup, login, forgot password, and secure password reset functionality via email with a time-limited token. The system is built with clean architecture, modular code, and best practices in security and scalability.

---

## 🧩 Features

### ✅ Backend (Node.js + Express.js)

* User Signup with:

  * First Name, Last Name, Email, Password
  * Unique email validation
  * Hashed passwords using bcrypt
* JWT-based Login & Auth middleware
* Forgot Password:

  * Sends time-limited reset password link (valid for 5 minutes)
  * Link received on registered email
* Reset Password:

  * Accepts new password via frontend
  * Updates password securely
* Get User Info:

  * Protected route using JWT
* API documented using Postman

### 🎨 Frontend (React.js)

* Signup and Login forms with client-side validation
* Forgot Password form to send reset email
* Reset Password page accessed via email link
* Displays success messages and validation feedback
* Clean UI with reusable components

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS, Axios, React Router
* **Backend:** Node.js, Express.js, Mongoose, JWT, Bcrypt, Nodemailer
* **Database:** MongoDB (Cloud or Local)
* **Others:** dotenv, cors, nodemon

---

## 🚀 Getting Started

### 🔧 Backend Setup

1. **Navigate to backend folder**

```bash
cd backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**
   Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_app_password
BASE_URL=http://localhost:4500
```

4. **Start backend server**

```bash
npm start
```

---

### 💻 Frontend Setup

1. **Navigate to frontend folder**

```bash
cd frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Update API base URL in your Axios instance or env file**

```env
REACT_APP_API_URL=http://localhost:4500/api
```

4. **Start frontend app**

```bash
npm run dev
```

---

## 🧪 API Endpoints

| Method | Endpoint                     | Description                     |
| ------ | ---------------------------- | ------------------------------- |
| POST   | `/api/signup`                | Register a new user             |
| POST   | `/api/login`                 | Login and receive JWT token     |
| GET    | `/api/user`                  | Get current user (JWT required) |
| POST   | `/api/forgot-password`       | Send reset link to email        |
| POST   | `/api/reset-password/:token` | Reset password using token      |

---


## 🙋‍♂️ Author

**Abhishek Mishra**
📧 \[Your Email]
🔗 [LinkedIn](https://www.linkedin.com/in/abhishekmishra04/)
💻 [GitHub](https://github.com/abhishekmishra0409)

