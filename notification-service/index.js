const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Redis = require('ioredis');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*', // In production, replace with frontend URL mapping
        methods: ['GET', 'POST']
    }
});

// Redis subscriber client configured to not crash on connection failure
const redisSubscriber = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: null,
    retryStrategy(times) {
        return Math.min(times * 200, 5000);
    }
});
redisSubscriber.on('error', (err) => console.error('Redis Subscriber Error:', err.message));
redisSubscriber.on('error', (err) => console.error('Redis Subscriber Error:', err.message));

// Socket connections
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

// Subscribe to Redis events
redisSubscriber.subscribe('ticket_events', 'auth_events', (err, count) => {
    if (err) {
        console.error('Failed to subscribe:', err.message);
    } else {
        console.log(`Subscribed to ${count} channel(s). Listening for ticket_events and auth_events.`);
    }
});

redisSubscriber.on('message', (channel, message) => {
    if (channel === 'ticket_events' || channel === 'auth_events') {
        try {
            const eventPayload = JSON.parse(message);
            console.log(`Received event: ${eventPayload.event}`, eventPayload.data);
            
            // Update auth context with _id for Mongoose compatibility
            if (eventPayload.data && eventPayload.data.user) {
                eventPayload.data.user._id = eventPayload.data.user.id;
            }
            
            // Broadcast to all connected clients
            io.emit(eventPayload.event, eventPayload.data);
        } catch (error) {
            console.error('Error parsing Redis message', error);
        }
    }
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', service: 'notification-service' });
});

const PORT = process.env.PORT || 5003;

server.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
});
