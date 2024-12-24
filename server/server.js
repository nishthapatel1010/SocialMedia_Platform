const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Import MongoDB connection
const authRoute = require('./Routes/AuthRoute'); // Ensure the path is correct
const userRoute = require('./Routes/UserRoute'); // Ensure the path is correct
const postRoute= require('./Routes/PostRoute')

require('dotenv').config(); // Load environment variables

// Initialize the Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json()); // You can use express's built-in middleware to parse JSON (no need for body-parser)

// Connect to MongoDB
connectDB();

// Use routes
app.use('/auth', authRoute); // This will prefix all routes from authRoute with /auth
app.use('/user', userRoute); // This will prefix all routes from authRoute with /auth
app.use('/post', postRoute); // This will prefix all routes from authRoute with /auth

// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
