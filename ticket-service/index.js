const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const ticketRoutes = require('./routes/ticketRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use('/api/tickets', ticketRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', service: 'ticket-service' });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Ticket Service running on port ${PORT}`);
});
