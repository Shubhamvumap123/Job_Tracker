# Job Application Tracker - Specifications

## 1. Project Overview

**Project Name**: Job Tracker SaaS
**Description**: A full-stack web application designed for creating, managing, and tracking job applications throughout the hiring process. It provides a centralized dashboard for users to monitor application statuses and locations effectively. 
**Objective**: Build a scalable and maintainable application demonstrating best practices in the MERN stack (MongoDB, Express.js, React.js, Node.js), including secure authentication, modern UI design, and real-time updates via WebSockets.

---

## 2. Core Features & Functional Requirements

### 2.1 User Authentication & Authorization
- **Registration/Login**: Secure user signup and login utilizing JSON Web Tokens (JWT) and Bcrypt for password hashing.
- **Protected Routes**: Restrict access to the job dashboard so only authenticated users can view their applications.

### 2.2 Job Management (CRUD)
- **Create Job Apps**: Users can submit new job applications with Company, Position, Location, Salary, Notes, and Status.
- **View Dashboard**: A comprehensive dashboard listing all jobs in a List View or Grid View.
- **Update Jobs**: Users can modify a job's Status (e.g., Applied, Interview, Offer, Rejected) or details over time.
- **Delete Jobs**: Authorized users can remove tracking entries.

### 2.3 Real-time Updates
- **Live Sync**: Implement Socket.io to push real-time updates across multiple active sessions when a job is modified.

### 2.4 Search & Filtering
- **Status Filter**: Rapidly filter jobs based on their current hiring pipeline status.
- **Keyword Search**: Search functionality by company or position to quickly locate specific applications.

---

## 3. Technical Requirements (Tech Stack)

### 3.1 Frontend (Client)
- **Framework**: React.js built heavily with Vite for rapid development.
- **Styling**: Tailwind CSS for modern, responsive, and maintainable utility-first styling.
- **Icons**: Lucide-React for clean and professional iconography.
- **Routing**: React Router DOM (v7) for seamless client-side page navigation.
- **HTTP/API Client**: Axios for robust data fetching.
- **WebSockets**: Socket.io-client for listening to real-time events.

### 3.2 Backend (Server)
- **Runtime Environment**: Node.js.
- **Web Framework**: Express.js providing robust REST API structuring.
- **Database**: MongoDB utilizing Mongoose ODM for schemas.
- **Authentication**: `jsonwebtoken` (JWT) for secure session handling and `bcryptjs` for encryption.
- **WebSockets**: Socket.io for managing real-time connections.
- **Middleware**: CORS for cross-origin compliance, Dotenv for environment configuration.

---

## 4. Database Modeling

### 4.1 Job Collection (Schema)
- `_id`: ObjectId (Auto-generated)
- `company`: String (Required, trimmed)
- `position`: String (Required)
- `status`: String (Enum: ['Applied', 'Interview', 'Offer', 'Rejected'], default: 'Applied')
- `location`: String
- `salary`: String
- `notes`: String
- `user`: ObjectId (Reference to `User` collection)
- `createdAt`: Date (Auto Timestamp)
- `updatedAt`: Date (Auto Timestamp)

### 4.2 User Collection (Schema)
- `_id`: ObjectId (Auto-generated)
- `name`: String (Required)
- `email`: String (Required, Unique)
- `password`: String (Required, Hashed)
- `role`: String (Enum: ['customer', 'agent', 'admin'], default: 'customer')
- `createdAt`: Date (Auto Timestamp)

---

## 5. System Architecture & API Design

### 5.1 Architecture
The project follows a Monolithic MERN stack architecture.
- **Client**: Single Page Application (SPA) built with React/Vite.
- **Server**: Monolithic Node/Express backend handling user authentication, job logic, and Socket.io endpoints.
- **Database**: MongoDB for persistent data.

### 5.2 Key REST API Endpoints

#### User Routes (`/api/users`)
- `POST /`: Registers a new user.
- `POST /login`: Authenticates a user and returns a JWT token.
- `GET /me`: Retrieves the current user's profile (requires authentication).

#### Job Routes (`/api/jobs`)
- `GET /list`: Retrieves all jobs for the authenticated user (supports search/status queries).
- `POST /create`: Creates a new job application.
- `PUT /update/:id`: Updates an existing job entry.
- `DELETE /delete/:id`: Removes a specific job entry.

---

## 6. UI / UX Guidelines

- **Responsiveness**: The dashboard must adapt gracefully to Mobile, Tablet, and Desktop environments using Tailwind's responsive prefixes.
- **User Feedback**: Immediate visual feedback for actions (e.g., Toast notifications, loading spinners).
- **Simplicity**: Maintain a clean, intuitive layout heavily focusing on readable typography and clear action buttons.
- **Flexibility**: Allow toggling between Grid and List views for the Job Dashboard.
