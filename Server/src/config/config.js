const mongoose = require('mongoose');

// Replace the URI with your MongoDB connection string
const uri = "mongodb+srv://shubhamvumap_db_user:3Ifle63mSImoLX5Z@cluster0.xxktdey.mongodb.net/";
// For MongoDB Atlas, the URI will be in the format: 
// "mongodb+srv://<username>:<password>@<cluster-url>/yourDatabaseName"

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('MongoDB Connected successfully');
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
