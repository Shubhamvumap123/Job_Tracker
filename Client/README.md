# Ticket Support SaaS - Frontend Client

This is the React.js + Vite frontend for the Ticket Support SaaS application. It interacts with the backend microservices through a unified Nginx API Gateway.

## Features
- **Modern UI**: Styled with TailwindCSS and Lucide-React.
- **Dynamic API Routing**: Built to seamlessly consume standard `Axios` requests without hardcoding specific backend ports, enabling scalable Docker proxying.
- **Real-Time Context**: Utilizes `Socket.io-client` to listen for immediate ticket status updates emitted by the `notification-service`.

## Setup Instructions

### With Docker (Recommended)
You do not need to start the client manually. The root `docker-compose.yml` mounts this directory into a Node.js container and exposes it by proxying it through the unified Nginx gateway.

### Manual Local Development
If you prefer running just the frontend development server:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the Vite server:
   ```bash
   npm run dev
   ```

*Note: You must also have the backend services running (preferably via docker-compose) for the API routes to resolve properly.*
