// dbConnection.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// console.log('Mongo URL:', process.env.MONGO_URL); // Check if MONGO_URL is defined

mongoose.set('strictQuery', false); // Prepare for Mongoose 7 deprecation warning

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
