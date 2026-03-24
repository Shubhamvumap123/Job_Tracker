# Job Tracker SaaS

A robust, production-ready full-stack application designed for creating, managing, and tracking job applications in real-time. This project features a modern React frontend and a monolithic Node.js backend.

> 📚 **Project Documentation**:
> - [Project Specifications](specifications.md): Core functional and technical requirements.
> - [Build & Run Guide](BUILD.md): Detailed instructions on building, running, and deploying the application.

## 🌟 Features

### Core Functionality
- **User Authentication**: Secure signup, login, and authorization using JSON Web Tokens (JWT).
- **Manage Job Applications**: Users can track job applications with details like Company, Position, Status, Location, and Salary.
- **Real-Time Updates**: Instant WebSocket updates via Socket.io when a job application is created, updated, or deleted.
- **RESTful API**: A unified Express.js backend securely serving all React frontend requests.

### Monolithic Architecture
- **Server**: A single Node.js/Express.js backend providing user authentication and job management endpoints.
- **Database Layer**: MongoDB for persistence.
- **Client**: Single Page React Application built with Vite.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: React.js / Vite
- **Styling**: Tailwind CSS, Lucide React Icons
- **HTTP Client**: Axios
- **Real-Time**: Socket.io-client

### Backend (Server)
- **Runtime**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Real-Time**: Socket.io

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- Local or Cloud MongoDB Database

### Local Development

1. **Clone the repository.**
2. **Server Setup**:
   - `cd Server`
   - `npm install`
   - Create a `.env` file with `MONGO_URL`, `JWT_SECRET`, and `PORT=5000`.
   - `npm run dev` (Runs on port 5000)
3. **Client Setup**:
   - `cd Client`
   - `npm install`
   - `npm run dev` (Runs on port 5173)

---

## 🚀 Deployment

The project is structured for easy deployment to cloud platforms:
- **Backend**: Can be deployed as a Web Service on platforms like Render, Heroku, or DigitalOcean.
- **Frontend**: Designed to be compiled (`npm run build`) and deployed to static hosting platforms like Vercel, Netlify, or AWS S3.
