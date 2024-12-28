const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const portfinder = require("portfinder");

// Import the connectDB function from dbConnection.js
const connectDB = require('./config/db');

// routes
const AuthRoute = require('./routes/AuthRoute');
const UserRoute = require('./routes/UserRoute');
const PostRoute = require('./routes/PostRoute');
const UploadRoute = require('./routes/UploadRoute');
const ChatRoute = require('./routes/ChatRoute');
const MessageRoute = require('./routes/MessageRoute');

const app = express();

// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// to serve images inside public folder
app.use(express.static('public'));
app.use('/images', express.static('images'));

// Load environment variables
dotenv.config();

// Debugging: check if the MongoDB connection string is loaded correctly
console.log("MongoDB URL:", process.env.MONGO_URL);  // Make sure this is not undefined

// Call connectDB function to establish MongoDB connection
connectDB();

// Use routes
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/posts', PostRoute);
app.use('/upload', UploadRoute);
app.use('/chat', ChatRoute);
app.use('/message', MessageRoute);

// Set the initial port or fallback to 5500
const initialPort = process.env.PORT || 5500;

// Use portfinder to find an available port
portfinder.getPortPromise({ port: initialPort })
  .then((port) => {
    // Start the server on the found port
    app.listen(port, () => {
      console.log(`Listening at Port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error finding an available port:', err);
  });
