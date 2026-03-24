# Build & Deployment Guide

This document explains the local execution and deployment processes for the Job Tracker SaaS application.

## 1. System Requirements
- **Node.js**: Version 18+
- **MongoDB**: A local instance running on port `27017` or a cloud MongoDB Atlas URI.

## 2. Directory Structure Overview
The project is split into two primary directories, functioning as entirely separate build environments:
1. **Server/**: The Node.js/Express monolithic backend.
2. **Client/**: The Vite/React single-page application frontend.

## 3. Local Development Commands

### Running the Backend Server
Open a terminal and navigate to the `Server` directory:
```bash
cd Server
npm install
# Create a .env file with MONGO_URL, JWT_SECRET, and PORT=5000
npm run dev
```
The server will boot up and handle API requests at `http://localhost:5000`.

### Running the Frontend Client
Open a second terminal and navigate to the `Client` directory:
```bash
cd Client
npm install
npm run dev
```
Vite will start the development server with Hot Module Replacement (HMR) at `http://localhost:5173`. 
The frontend makes API calls natively to the backend via dynamic configurations based on the `window.location.hostname`.

## 4. Production Deployment

### Backend (Server)
For deployment to platforms like Render, Railway, or Heroku:
1. Connect your repository to the hosting platform.
2. Set the Root Directory to `Server`.
3. Set the Build Command to `npm install`.
4. Set the Start Command to `npm run start` (or `node src/server.js`).
5. Inject your `MONGO_URL` and `JWT_SECRET` natively into the platform's Environment Variables dashboard.

### Frontend (Client)
For deployment to static hosting platforms like Vercel or Netlify:
1. Connect your repository to the hosting platform.
2. Set the Root Directory to `Client`.
3. Set the Build Command to `npm run build`.
4. Set the Output/Publish Directory to `dist`.
5. In the platform's settings, ensure Single Page Application (SPA) routing is enabled by redirecting all 404s to `index.html`.

Once both are deployed, ensure the `API_BASE_URL` in the frontend files points directly to your deployed Backend URL.
