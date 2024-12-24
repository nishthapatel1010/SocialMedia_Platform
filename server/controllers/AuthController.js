// Routes/AuthRoute.js
const express = require('express');
const bcrypt = require('bcryptjs'); // To hash passwords
const jwt = require('jsonwebtoken'); // For generating tokens
const User = require('../Models/userModel'); // Import User model

const registeruser = async (req, res) => {
  const { username, password, firstname, lastname } = req.body;

  // Validate input
  if (!username || !password || !firstname || !lastname) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists!' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const newUser = new User({ username, password: hashedPassword, firstname, lastname });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id, username: newUser.username }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    // Respond with success
    res.status(201).json({
      message: 'User created successfully!',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
      },
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
};
const loginuser = async (req, res) => {
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required!' });
  }

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password!' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password!' });
    }

    // Generate JWT token after successful login
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.SECRET_KEY, // Secret key from .env file
      { expiresIn: '1h' } // Token expiration time (1 hour)
    );

    // Respond with success message and token
    res.status(200).json({
      message: 'Login successful!',
      token, // Send the token to the client
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, try again later.' });
  }
};
module.exports = { registeruser,loginuser };