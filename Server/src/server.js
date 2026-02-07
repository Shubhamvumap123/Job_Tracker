const express = require('express');
const connectDB = require('./config/config');
const cors = require('cors');
const app = express();

// 1. Wrap initialization in an async function
const startServer = async () => {
    try {

        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use('/api/tickets', require('./routes/TicketRoutes'));
        // 2. Wait for DB connection first
        await connectDB();
        console.log('✅ Database connected successfully');

        const PORT = process.env.PORT || 5000;

        // 3. Store the server instance to handle shutdowns later
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server heart beating on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
        });


    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1); // Exit with failure
    }
};


startServer();