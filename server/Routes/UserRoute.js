const express = require('express');
const router = express.Router();
const {getUser,updateUser,deleteUser, followUser, UnfollowUser}=require('../controllers/UserController');

// Define the route to respond with "user route"
router.get('/:id',getUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);
router.put('/:id/follow',followUser);
router.put('/:id/unfollow',UnfollowUser);

// Export the router using CommonJS export syntax
module.exports = router;
