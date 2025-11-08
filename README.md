# 🔐 Next.js Authentication System

A **secure, production-ready authentication system** built with **Next.js 13+ (App Router)** and **MongoDB**, featuring email verification, JWT-based authentication, password reset, and protected routes — all styled with **Tailwind CSS**.

---

## 🏆 Overview

This project provides a **full-stack authentication flow** for modern web apps using Next.js and MongoDB.  
It includes signup, login, logout, email verification, resend verification, password reset, and user profile features — all connected through secure backend APIs.

---

## 🚀 Tech Stack

### 🖥️ Frontend
- ⚡ **Next.js 13+ (App Router)**
- ⚛️ **React 18**
- 🎨 **Tailwind CSS**
- 🔔 **React Hot Toast** (Notifications)
- 🌐 **Axios** (API Communication)

### ⚙️ Backend
- 🧠 **Next.js API Routes**
- 🗄️ **MongoDB + Mongoose**
- 🔑 **JWT (JSON Web Tokens)**
- 🔒 **BcryptJS** (Password Hashing)
- 📧 **Nodemailer + Mailtrap** (Email Delivery)
- 🧮 **Crypto** (SHA-256 token hashing)

### 🧰 Utilities
- **TypeScript Support (optional)**
- **ESLint + Prettier**
- **Environment Variables via `.env`**
- **VS Code Ready**

---

## ✨ Key Features

✅ User Registration with Email Verification  
✅ Secure Login with JWT + HTTP-only Cookies  
✅ Password Hashing using Bcrypt  
✅ Forgot Password + Email Reset System  
✅ Resend Email Verification Feature  
✅ Protected Routes (via middleware)  
✅ Toast Notifications for All Actions  
✅ Tailwind Responsive Design  
✅ Clean Code and Folder Structure  
✅ Fully Working with Mailtrap Testing Inbox  

---

## 📸 Screenshots

### 🧾 Signup and Email Verification
![Signup Screenshot](https://via.placeholder.com/900x400?text=Signup+Page+and+Verification)

### 🔑 Login + Forgot Password
![Login Screenshot](https://via.placeholder.com/900x400?text=Login+and+Forgot+Password)

### ✉️ Reset Password
![Reset Screenshot](https://via.placeholder.com/900x400?text=Password+Reset+Email+Flow)

---

## 🧱 Project Structure
```
auth-app/
├── src/
│ ├── app/
│ │ ├── api/
│ │ │ ├── users/
│ │ │ │ ├── signup/route.ts
│ │ │ │ ├── login/route.ts
│ │ │ │ ├── verifyemail/route.ts
│ │ │ │ ├── resend-verification/route.ts
│ │ │ │ ├── request-reset/route.ts
│ │ │ │ ├── reset-password/route.ts
│ │ ├── login/page.tsx
│ │ ├── signup/page.tsx
│ │ ├── profile/page.tsx
│ │ ├── verifyemail/page.tsx
│ │ ├── forgotpassword/page.tsx
│ │ └── resetpassword/page.tsx
│ ├── helper/
│ │ └── mailer.ts
│ ├── model/
│ │ └── userModel.ts
│ ├── dbConfig/
│ │ └── dbConfig.ts
│ └── middleware/
├── public/
├── .env
└── package.json
```



## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd auth-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
TOKEN_SECRET=your_jwt_secret
DOMAIN=http://localhost:3000
MAILTRAP_USER=your_mailtrap_user
MAILTRAP_PASS=your_mailtrap_password
```

4. Run the development server:
```bash
npm run dev
```

## 🌐 API Routes

- `POST /api/users/signup` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/logout` - User logout
- `POST /api/users/verifyemail` - Verify email
- `GET /api/users/me` - Get user profile



## 🔒 Security Features

- Password Hashing using Bcrypt
- JWT Token Authentication
- Protected API Routes
- Email Verification
- Secure HTTP-only Cookies

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 Authors


**Subodh Kumar**  
💼 Full Stack Developer  
📧 Email: subodh261003kumar@gmail.com  
🔗 [GitHub Profile](https://github.com/Subodh26Oct)  
🌐 [Portfolio Website (optional)](https://your-portfolio-link.com)

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Mailtrap](https://mailtrap.io/)
- [JWT.io](https://jwt.io/)
- [BcryptJS](https://www.npmjs.com/package/bcryptjs)


## 🏁 Summary

This project demonstrates a **complete authentication system** built with modern web technologies —  
secure, scalable, and production-ready.  

Use it as a **boilerplate** for your SaaS application, admin dashboard, or any project requiring secure user authentication.  

Made with ❤️ by **Subodh Kumar**.
