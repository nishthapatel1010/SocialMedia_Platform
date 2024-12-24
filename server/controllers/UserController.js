// const express = require('express');
const bcrypt = require("bcrypt");
const usermodel = require("../Models/userModel");

// Get a user
const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await usermodel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json({ message: "No such user exists" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Update a user's data
const updateUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus, password } = req.body;

  // Debugging - Check the values
  // console.log('req.body:', req.body);
  // console.log('id:', id);
  // console.log('currentUserId:', currentUserId);
  // console.log('currentUserAdminStatus:', currentUserAdminStatus);

  // Check if the current user is allowed to update their profile
  if (id === currentUserId || currentUserAdminStatus === true) {
    try {
      // Hash the password if provided
      if (password) {
        const salt = await bcrypt.genSalt(10); // Await for bcrypt.genSalt
        req.body.password = await bcrypt.hash(password, salt); // Await the hash
      }

      // Update the user
      const user = await usermodel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      // Remove password before sending the response
      // const { password, ...userWithoutPassword } = updatedUser._doc;

      // Return the updated user details without the password
      return res.status(200).json(user);
    } catch (error) {
      // Handle any errors
      // console.error('Error updating user:', error);
      return res.status(500).json(error);
    }
  } else {
    // Unauthorized access
    return res
      .status(403)
      .json({ message: "You are not authorized to update this profile." });
  }
};
//  delete user
const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus } = req.body;
  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await usermodel.findByIdAndDelete(id);
      res.status(200).json("delete successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access denied !! you can only delete your profile");
  }
};
// follow user
const followUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;
  if (currentUserId === id) {
    res.status(403).json("request forbidden");
  } else {
    try {
      const followUser = await usermodel.findById(id);
      const followingUser = await usermodel.findById(currentUserId);
      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } });
        await followingUser.updateOne({ $push: { followings: id } });
        res.status(200).json("User Followed!!");
      } else {
        rex.status(403).json("user already following you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
// Unfollow user
const UnfollowUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;
  if (currentUserId === id) {
    res.status(403).json("request forbidden");
  } else {
    try {
      const followUser = await usermodel.findById(id);
      const followingUser = await usermodel.findById(currentUserId);
      if (followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $pull: { followers: currentUserId } });
        await followingUser.updateOne({ $pull: { followings: id } });
        res.status(200).json("User UnFollowed!!");
      } else {
        rex.status(403).json("user already following you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
module.exports = { getUser, updateUser, deleteUser, followUser,UnfollowUser };
