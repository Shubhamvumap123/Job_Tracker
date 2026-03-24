# Build & Orchestration Guide

This document explains the build process and Docker orchestration for the Ticket Support SaaS application.

## 1. System Requirements
- **Docker**: Version 20.10+
- **Docker Compose**: Version 2.0+ or docker-compose 1.29+
- **Node.js**: (Only if running outside of Docker) Version 18+

## 2. Global Services Overview
The `docker-compose.yml` file sits in the root of the project and wires together six separate containers into a single virtual network (`ticket_net`):
1. **mongodb**: Persistent database container using `mongo:6-jammy`. Stores information for Auth and Ticket services.
2. **redis**: In-memory message broker using `redis:7-alpine`. Facilitates Pub/Sub between the Ticket Service and Notification Service.
3. **api-gateway**: An Nginx container built from `api-gateway/Dockerfile` that exposes port `80` to the host machine and reverse proxies internal traffic.
4. **auth-service**: Node.js microservice running on port `5001` internally.
5. **ticket-service**: Node.js microservice running on port `5002` internally.
6. **notification-service**: Node.js WebSockets microservice running on port `5003` internally.
7. **frontend**: React/Vite client running on port `5173` internally, served dynamically for HMR during dev through Nginx proxying.

## 3. Build and Run Commands

### Start All Services
To build the images and start the entire stack in detached mode:
```bash
docker-compose up --build -d
```
All traffic will be available at `http://localhost`.

### View Logs
To check the logs of a specific service (e.g., if you are debugging the Notification service):
```bash
docker logs <container_name> -f
```
Example container names: `ticket_support_auth`, `ticket_support_gateway`, `ticket_support_redis`.

### Stop Services
To spin down everything without deleting volumes:
```bash
docker-compose down
```
To spin down and wipe the MongoDB data volume (resetting the database):
```bash
docker-compose down -v
```

## 4. Multi-Stage Dockerfiles (Production Addendum)
Currently, the `Dockerfile`s are optimized for running the development servers using `npm install` and Node `index.js`. 
To deploy this architecture to a genuine production environment (like AWS ECS), you should modify the frontend `Client/Dockerfile` to employ a multi-stage Nginx build:
1. `npm run build`
2. `COPY dist /usr/share/nginx/html`
This will serve pre-compiled, minified React assets globally.
