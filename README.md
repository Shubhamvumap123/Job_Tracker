# Support Ticket Management System

A robust, full-stack MERN application designed for creating, managing, and tracking support tickets. This project demonstrates a clean architecture, responsive UI, and solid backend validation.

## Features

### Core Functionality
- **Create Tickets**: Users can submit new tickets with a Title, Description, Priority (High/Medium/Low), and Status.
- **Dashboard**: A centralized view of all tickets, featuring:
  - **Dynamic Statistics**: Real-time counters for Total, Open, In Progress, and Resolved tickets.
  - **Status Indicators**: Color-coded badges for quick visual recognition of priority and status.
- **Search & Filter**:
  - **Search**: Real-time filtering by ticket title (debounced for performance).
  - **Filter**: Dropdowns to filter by Status and Priority.
- **Edit Ticket**: A modal interface to update ticket details without leaving the dashboard.
- **Delete Ticket**: Permanently remove tickets from the system.

### UX/UI
- **Responsive Design**: Fully responsive layout that adapts to mobile, tablet, and desktop screens.
  - **Collapsible Sidebar**: Navigation drawer for smaller screens.
  - **Scrollable Table**: Fixed header with scrollable body for large datasets.
- **Feedback & Validation**:
  - **Frontend**: Immediate visual feedback for actions (loading states, success updates).
  - **Backend Errors**: Clear, user-friendly error messages displayed directly in the UI if validation fails.

### Technical Highlights
- **Validation**:
  - **Rules**: Title and Description must be at least 2 characters and contain at least one letter (pure numbers are rejected).
  - **Error Handling**: The backend catches invalid data and returns specific 400 Bad Request messages, which the frontend displays.
- **Architecture**:
  - **Frontend**: Component-based React architecture using Hooks (`useTickets`, `useDebounce`).
  - **Backend**: MVC pattern (Model, View/Route, Controller) with Mongoose for data modeling.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Routing**: React Router DOM

### Backend (Server)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Utilities**: CORS, Dotenv, Nodemon

---

## 📂 Project Structure

```
Ticket_Support/
├── Client/                 # Frontend React Application
│   ├── src/
│   │   ├── API/           # API service configuration
│   │   ├── components/    # Reusable UI components (CreateTicket, TicketRow, etc.)
│   │   ├── hooks/         # Custom hooks (useTickets, useDebounce)
│   │   ├── pages/         # Page components (Home, Tickets)
│   │   └── Main.jsx       # Entry point
│   ├── index.css          # Global styles & Tailwind imports
│   └── package.json       # Frontend dependencies
│
├── Server/                 # Backend Node.js Application
│   ├── src/
│   │   ├── config/        # Database connection logic
│   │   ├── controller/    # Request handlers (TicketController)
│   │   ├── model/         # Mongoose schemas (Ticket.Model)
│   │   ├── routes/        # API route definitions (TicketRoutes)
│   │   └── server.js      # Server entry point
│   └── package.json       # Backend dependencies
└── README.md              # Project documentation
```

---

## ⚙️ Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas URL)

### 1. Backend Setup

1.  Navigate to the server directory:
    ```bash
    cd Server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Configuration**: Ensure a `.env` file exists in `Server/` with the following content (or modify `src/config/config.js` directly if not using dotenv):
    ```env
    PORT=5000
    MONGO_URI=mongodb+srv://shubhamvumap_db_user:Password123@cluster0.xxktdey.mongodb.net/
    ```
4.  Start the server:
    ```bash
    npm run start
    ```
    The server will run at `http://localhost:5000`.

### 2. Frontend Setup

1.  Open a new terminal and navigate to the client directory:
    ```bash
    cd Client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will launch at `http://localhost:5173`.

---

## 📡 API Documentation

Base URL: `http://localhost:5000/api/tickets`

| Method | Endpoint       | Description                                      | Query Params               |
| :----- | :------------- | :----------------------------------------------- | :------------------------- |
| POST   | `/create`      | Create a new ticket                              | -                          |
| GET    | `/list`        | Retrieve all tickets (with filtering/search)     | `status`, `priority`, `search` |
| PUT    | `/update/:id`  | Update an existing ticket by ID                  | -                          |
| DELETE | `/delete/:id`  | Delete a ticket by ID                            | -                          |

### Sample Ticket Object
```json
{
  "_id": "64f8a...",
  "title": "Login Page Error",
  "description": "User cannot login with valid credentials.",
  "priority": "High",
  "status": "Open",
  "createdAt": "2023-09-06T10:00:00.000Z"
}
```

---

## ✅ Validation Rules

To ensure data quality, the following validation rules are enforced on the backend:

1.  **Title**:
    - Required.
    - Min length: 2 characters.
    - Max length: 100 characters.
    - **Must contain at least one letter** (cannot be purely numeric).
2.  **Description**:
    - Required.
    - Min length: 2 characters.
    - **Must contain at least one letter**.
3.  **Priority**:
    - Must be one of: `Low`, `Medium`, `High`.
4.  **Status**:
    - Must be one of: `Open`, `In Progress`, `Closed`.

If any of these rules are violated, the API returns a `400 Bad Request` with a specific error message, which is displayed to the user.

---

## 📊 Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    TICKET {
        ObjectId _id PK
        String title "Required, Min 2 chars, Must contain letter"
        String description "Required, Min 2 chars, Must contain letter"
        String priority "Enum: Low, Medium, High"
        String status "Enum: Open, In Progress, Closed"
        String shape "Enum: Circle, Square, Triangle"
        Date createdAt "Default: Date.now"
    }
```

---
