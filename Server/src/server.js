const express = require('express');
const connectDB = require('./config/config'); // Path to your db.js file

const app = express();

// Connect to the database
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// You can now define your Mongoose schemas and models to interact with the DB
