const mongoose = require("mongoose");

require('dotenv').config(); // Load environment variables from .env file
const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/cft_assignment";

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = connectDB;