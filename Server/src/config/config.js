const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    // 🛡️ Sentinel: Fail securely if DB credentials are not provided
    if (!process.env.MONGO_URL) {
        console.error('MongoDB Connection Error: MONGO_URL environment variable is missing.');
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
