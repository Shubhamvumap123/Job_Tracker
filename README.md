# Ticket Support SaaS

A robust, production-ready microservices application designed for creating, managing, and tracking support tickets in real-time. This project features a modern React frontend with a distributed backend orchestrated by Docker.

> 📚 **Project Documentation**:
> - [Project Specifications](specifications.md): Core functional and technical requirements.
> - [Build & Orchestration Guide](BUILD.md): Detailed instructions on building, running, and managing the Docker stack.

## 🌟 Features

### Core Functionality
- **User Authentication**: Secure signup, login, and authorization across microservices using JWT.
- **Manage Tickets**: Users can submit support tickets with Title, Description, Priority, and Status.
- **Real-Time Notifications**: Instant WebSocket updates powered by Redis pub/sub when a ticket is created or updated.
- **API Gateway**: Unified Nginx reverse proxy to securely route API requests to Auth, Ticket, and Notification services.

### Microservices Architecture
- **Auth Service**: Node.js microservice maintaining user data and managing JWTs.
- **Ticket Service**: Node.js microservice managing CRUD logic for tickets.
- **Notification Service**: WebSockets-based microservice pushing real-time events to connected clients.
- **Database Layer**: MongoDB for persistence and Redis for pub/sub event brokering.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: React.js / Vite
- **Styling**: Tailwind CSS, Lucide React Icons
- **HTTP Client**: Axios
- **Real-Time**: Socket.io-client

### Backend (Microservices)
- **Runtime**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Message Broker**: Redis
- **Gateway**: Nginx
- **Orchestration**: Docker & Docker Compose

---

## ⚙️ Setup Instructions

### Prerequisites
- [Docker](https://www.docker.com/) and Docker Compose installed on your system.

### Quick Start (Recommended)

The easiest way to run the entire SaaS application is using Docker Compose. It will automatically provision MongoDB, Redis, the API Gateway, all Microservices, and the Frontend.

1.  Clone the repository and ensure Docker is running.
2.  From the root directory, run:
    ```bash
    docker-compose up --build
    ```
3.  Access the single-page application dashboard at `http://localhost`.

### Local Development (Without Docker)

You can also run services individually for local development, provided you have a local MongoDB instance running on `27017` and a local Redis instance on `6379`.

1. **Auth Service**: `cd auth-service && npm install && npm start` (Runs on 5001)
2. **Ticket Service**: `cd ticket-service && npm install && npm start` (Runs on 5002)
3. **Notification Service**: `cd notification-service && npm install && npm start` (Runs on 5003)
4. **Client**: `cd Client && npm install && npm run dev` (Runs on 5173)

*Note: Without the Nginx API gateway running, you will need to manually configure the frontend's `.env` to point to the respective local service ports instead of hitting the unified `/api/...` paths.*

---

## 🚀 Deployment

Each microservice contains its own `Dockerfile`. For deployment, you can push these images to a container registry (AWS ECR, Docker Hub) and orchestrate them on platforms such as:
- AWS ECS (Elastic Container Service)
- DigitalOcean App Platform
- Kubernetes
