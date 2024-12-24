// dbConnection.js

const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
