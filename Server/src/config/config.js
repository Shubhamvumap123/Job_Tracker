const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    if (!process.env.MONGO_URL) {
        console.error('CRITICAL: MONGO_URL is not defined in environment variables');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB Connected successfully');
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1); // exit if we can't connect to db
    }
};

module.exports = connectDB;
