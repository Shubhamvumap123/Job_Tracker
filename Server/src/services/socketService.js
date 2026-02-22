const socketIo = require('socket.io');

let io;

const initSocket = (server) => {
    io = socketIo(server, {
        cors: {
            origin: ["http://localhost:5173", "http://localhost:5174", "https://ticket-support-orsjn.vercel.app"], // Allow dev and vercel
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected: ' + socket.id);

        // Join user to their own room for private notifications
        socket.on('join_user_room', (userId) => {
            socket.join(userId);
            console.log(`User ${userId} joined room ${userId}`);
        });

        // Join ticket room (for real-time updates on a specific ticket)
        socket.on('join_ticket_room', (ticketId) => {
            socket.join(ticketId);
            console.log(`Socket ${socket.id} joined ticket room ${ticketId}`);
        });

        // Handle typing events
        socket.on('typing', (data) => {
            socket.to(data.ticketId).emit('user_typing', data);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    return io;
};

const getIo = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};

module.exports = { initSocket, getIo };
