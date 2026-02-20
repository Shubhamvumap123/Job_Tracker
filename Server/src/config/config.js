const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// use local db as fallback if env variable is missing
const uri = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/support_tickets";

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB Connected successfully');
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1); // exit if we can't connect to db
    }
};

module.exports = connectDB;
