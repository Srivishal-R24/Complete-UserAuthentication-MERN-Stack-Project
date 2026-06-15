# MERN Authentication System

A full-stack authentication system built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). This application provides secure user authentication and account management features with a modern, responsive user interface.

## Features

* User Registration with validation
* Secure User Login and Logout
* JWT-based Authentication
* Email Verification System
* Forgot Password functionality
* Password Reset via Email Link
* Protected Routes for authenticated users
* Persistent User Sessions using Local Storage
* Real-time Password Strength Validation
* Responsive and Modern UI built with React and Tailwind CSS
* SweetAlert2 notifications for better user experience

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* React Icons
* SweetAlert2
* Context API

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Tokens (JWT)
* Bcrypt.js
* Nodemailer

## Authentication Flow

1. Users can register with their name, email, and password.
2. Verification emails are sent to activate accounts.
3. Registered users can log in securely.
4. Users can request password reset links through email.
5. Passwords can be reset using secure token-based links.
6. Authenticated users can access protected pages and manage their sessions.
7. Users can securely log out from the application.

## Getting Started

### Install Dependencies

Frontend:

```bash
npm install
npm run dev
```

Backend:

```bash
npm install
npm run dev
```

### Environment Variables

Create a `.env` file in the backend directory and configure:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:5173
```

## Project Goal

This project demonstrates the implementation of a complete authentication workflow using the MERN stack, following industry-standard security practices and modern frontend development techniques.
 --------------------------   screenshots------------------------------------
<img width="1595" height="826" alt="image" src="https://github.com/user-attachments/assets/82ae001b-3693-42b7-864d-e48aaebe766e" />

 <img width="947" height="700" alt="image" src="https://github.com/user-attachments/assets/4e9986c5-1c59-4f54-83c7-efd031c2eb73" />

 
<img width="1908" height="562" alt="image" src="https://github.com/user-attachments/assets/86ea43f6-f439-4625-bca6-33239524a0d9" />


<img width="1542" height="655" alt="image" src="https://github.com/user-attachments/assets/35a58818-a2f3-45b6-bb38-373556057a13" />


<img width="1461" height="815" alt="image" src="https://github.com/user-attachments/assets/6c710721-d35f-4281-ab41-24ce1bb5edb8" />


<img width="1512" height="809" alt="image" src="https://github.com/user-attachments/assets/9711064a-17c9-4aaa-9a35-69490dbcc782" />

============================================================================================================================



