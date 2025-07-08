require('dotenv').config();
const mongoose = require("mongoose");

const URL = process.env.MONGODB_URL;

const connectDb = async () =>{
    try {
        await mongoose.connect(URL);
        console.log("connection successful");
    } catch (error) {
        console.error("database not connected")
        process.exit(0);
    }
}

module.exports = connectDb;