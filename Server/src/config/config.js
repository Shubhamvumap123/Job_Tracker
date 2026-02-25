const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Require MONGO_URL to be set
const uri = process.env.MONGO_URL;

if (!uri) {
    console.error('Error: MONGO_URL environment variable is not defined.');
    process.exit(1);
}

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
