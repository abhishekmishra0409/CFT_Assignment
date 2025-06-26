# 🔐 Authentication API – Signup, Login, Forgot & Reset Password

This project is a secure and scalable **Authentication System** built with **Node.js**, **Express.js**, and **MongoDB**. It supports user **Signup**, **JWT-based Login**, **User Detail Fetching**, and a secure **Forgot & Reset Password** flow via email.

---

## 📌 Features

✅ User Signup with:

* First Name, Last Name, Email, and Password
* Unique email validation
* Encrypted passwords using **bcrypt**

✅ Login with:

* Email and Password
* Returns **JWT Token** for authenticated routes

✅ Get User Details:

* Requires valid JWT Token
* Returns logged-in user's data

✅ Forgot & Reset Password:

* Generates a secure reset link, valid for **5 minutes**
* Sends reset link via email
* Allows password reset through a simple UI
* Password updated and confirmation message shown
* Prevents reuse of old links

✅ Clean code structure and RESTful API design

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Authentication:** JWT, Bcrypt
* **Email Service:** Nodemailer
* **UI:** Basic HTML/CSS (for Reset Password Page)
* **Documentation:** Postman

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/abhishekmishra0409/CFT_Assignment.git
cd auth-api-task
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
BASE_URL=http://localhost:4500
```

### 4. Start the server

```bash
npm run dev
```

---

## 🔄 API Endpoints

| Method | Endpoint                          | Description                    |
| ------ | ----------------------------------| ------------------------------ |
| POST   | `/api/auth/signup`                | Register a new user            |
| POST   | `/api//authlogin`                 | Login and receive JWT token    |
| GET    | `/api/user`                       | Get user details (Protected)   |
| POST   | `/api/auth/forgot-password`       | Request a password reset email |
| POST   | `/api/auth/reset-password/:token` | Submit new password            |

📄 Full documentation available in Postman collection (see below).


---


## 📬 Contact

If you have any questions or suggestions, feel free to reach out:

**Abhishek Mishra**
📧 \[Your Email]
🔗 [Your LinkedIn](https://www.linkedin.com/in/abhishekmishra04/)
💻 [Your GitHub](https://github.com/abhishekmishra-dev)

