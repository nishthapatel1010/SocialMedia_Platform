const mongoose = require("mongoose");
const postmodel = require("../Models/postModel");
const usermodel= require('../Models/userModel')
// const { findById } = require("../Models/userModel");

// create new post
const createPost = async (req, res) => {
  const newpost = new postmodel(req.body);
  try {
    await newpost.save();
    res.status(200).json("post created");
  } catch (error) {
    res.status(500).json(error);
  }
};
// get a post
const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await postmodel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

//  update post
const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await postmodel.findById(postId);
    if (post.userId === userId) {
      await postmodel.updateOne({ $set: req.body });
      res.status(200).json("post updated");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//post delete
const deletePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await postmodel.findById(postId);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("post deleted");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Like and dislike post
const likepost= async (req,res)=>{
    const postId = req.params.id;
    const { userId } = req.body;
    try {
        const post = await postmodel.findById(postId);
        if(!post.likes.includes(userId)){
          await post.updateOne({$push: {likes:userId}})
          res.status(200).json("post liked");
        }
    else{
        await post.updateOne({$pull: {likes:userId}})
        res.status(200).json("post Unliked");
    }
    } catch (error) {
          res.status(500).json(error);
    }
}
// get timeline post
const timelinePost = async (req, res) => {
  const userId = req.params.id;
  try {
    // Find the current user by their ID
    const currentUser = await usermodel.findById(userId);
    
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the user's posts
    const userPosts = await postmodel.find({ userId });

    // Fetch posts from the user's followings, only if they have followings
    const friendPosts = currentUser.followings.length > 0
      ? await postmodel.find({ userId: { $in: currentUser.followings } })
      : [];

    // Combine the user's posts and friend's posts
    const timelinePosts = [...userPosts, ...friendPosts];

    // Sort posts by timestamp (most recent first)
    timelinePosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Respond with the timeline posts
    res.status(200).json(timelinePosts);
  } catch (error) {
    console.error("Error fetching timeline posts:", error); // Log the error for debugging
    res.status(500).json(error);
  }
};

module.exports = { createPost, getPost, updatePost ,deletePost ,likepost,timelinePost};
