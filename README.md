# Job Tracker Application

A robust, full-stack MERN application designed for creating, managing, and tracking job applications. This project is a production-ready SaaS dashboard that helps you organize your job search.

## Features

### Core Functionality
- **User Authentication**: Secure signup, login, and logout using JWT.
- **Manage Applications**: Users can submit new job applications with Company, Position, Location, Salary, Notes, and Status tracking.
- **Job Status Tracking**: Categorize applications into *Applied*, *Interview*, *Offer*, and *Rejected*.
- **Dashboard**: A centralized view of all applications, featuring:
  - **Dynamic Analytics**: Real-time stats for Total Applications, Applied, Interviewing, and Offers.
  - **Status Indicators**: Color-coded badges for quick visual recognition of application status.
- **Search & Filter**:
  - **Search**: Real-time filtering by company, position, or location.
  - **Filter**: Dropdowns to filter by application Status.
- **Edit & Delete**: A modal interface to update job application details and a fast way to remove rejected or stale jobs.

### UX/UI
- **Responsive Design**: Fully responsive layout that adapts to mobile, tablet, and desktop screens with a collapsible sidebar.
- **Modern Dashboard UI**: Professional SaaS layout built with TailwindCSS and Lucide React icons.
- **Feedback & Validation**:
  - **Frontend**: Immediate visual feedback, loaders, and toast notifications.
  - **Backend Errors**: Clear, user-friendly error messages if validation fails.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: React.js / Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Routing**: React Router DOM

### Backend (Server)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JSON Web Tokens (JWT)
- **Utilities**: CORS, Dotenv, Bcryptjs

---

## ⚙️ Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas URL)
- [pnpm](https://pnpm.io/) package manager

### 1. Backend Setup

1.  Navigate to the server directory:
    ```bash
    cd Server
    ```
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  **Configuration**: Ensure a `.env` file exists in `Server/` with the following content:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
4.  Start the server:
    ```bash
    pnpm start
    ```
    The server will run at `http://localhost:5000`.

### 2. Frontend Setup

1.  Open a new terminal and navigate to the client directory:
    ```bash
    cd Client
    ```
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  Start the development server:
    ```bash
    pnpm run dev
    ```
    The application will launch at `http://localhost:5173`.

---

## 🚀 Deployment (Vercel + Render)

### Backend (Render)
1. Push your code to GitHub.
2. Go to [Render](https://render.com/), create a new "Web Service".
3. Connect your GitHub repository.
4. Set the Build Command to `pnpm install` and the Start Command to `pnpm start`.
5. Add your Environment Variables (`MONGO_URI`, `JWT_SECRET`, etc.).
6. Deploy! Copy the generated API URL.

### Frontend (Vercel)
1. Go to [Vercel](https://vercel.com/) and create a new project.
2. Connect your GitHub repository.
3. Set the Framework Preset to Vite.
4. Ensure the Build Command is `pnpm run build`.
5. In your frontend API service files (e.g. `jobService.js`), replace `localhost` with your new Render backend API URL.
6. Deploy!

---

## 📸 Screenshots

*(Add screenshots of your application here)*

![Dashboard Screenshot](https://via.placeholder.com/800x450?text=Dashboard+Screenshot)
*Job Tracker Dashboard Overview*

![Create Job Application](https://via.placeholder.com/800x450?text=Create+Job+Screenshot)
*Create a new Job Application*
