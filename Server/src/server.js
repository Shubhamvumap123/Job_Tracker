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

        // wait for database to connect before starting server
        await connectDB();
        console.log('Database connected successfully');

        const PORT = process.env.MONGO_PORT || 5000;

        // 3. Store the server instance to handle shutdowns later
        app.listen(PORT, () => {
            console.log(`Server heart beating on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
        });

    } catch (error) {
        console.error(' Failed to start server:', error.message);
        process.exit(1); // stop process if critical error occurs
    }
};

startServer();