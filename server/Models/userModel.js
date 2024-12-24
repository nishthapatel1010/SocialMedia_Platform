const mongoose = require("mongoose");
// Define a schema for User
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    ProfilePicture: String,
    coverPicture: String,
    about: String,
    livesin: String,
    worksAt: String,
    relationship: String,
    followers: [],
    followings: [],
  },
  { timestamps: true }
);

// Create a model based on the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
