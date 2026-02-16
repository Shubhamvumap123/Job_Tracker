const express = require('express');
const connectDB = require('./config/config');
const cors = require('cors');
const app = express();

// Validate server startup and DB connection
const startServer = async () => {
    try {
        // middleware setup
        app.use(cors());
        app.use(express.json());
        app.use('/api/tickets', require('./routes/TicketRoutes'));
        app.use('/api/users', require('./routes/UserRoutes'));

        // wait for database to connect before starting server
        await connectDB();
        console.log('Database connected successfully');

        const PORT = process.env.MONGO_PORT || 5000;

        const server = app.listen(PORT, () => {
            console.log(`Server heart beating on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
        });

        // Initialize Socket.IO
        const { initSocket } = require('./services/socketService');
        const io = initSocket(server);

    } catch (error) {
        console.error(' Failed to start server:', error.message);
        process.exit(1); // stop process if critical error occurs
    }
};

startServer();