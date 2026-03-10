const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URL;
        if (!uri) {
            console.error('MongoDB Connection Error: MONGO_URL environment variable is missing.');
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
