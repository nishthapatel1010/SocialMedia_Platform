const express = require('express');
const router = express.Router();

// Import the controller functions
const { registeruser,loginuser } = require('../controllers/AuthController'); 
console.log(registeruser); 

// POST route for user registration
router.post('/register', registeruser);

// POST route for user login (uncomment if needed later)
router.post('/login', loginuser);

module.exports = router; // Export the router
