const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URL;

        // 🛡️ Sentinel: Fail securely if critical connection string is missing, rather than using a hardcoded secret fallback
        if (!uri) {
            console.error('CRITICAL ERROR: MONGO_URL environment variable is missing.');
            process.exit(1);
        }

        await mongoose.connect(uri);
        console.log('MongoDB Connected successfully');
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1); // exit if we can't connect to db
    }
};

module.exports = connectDB;
