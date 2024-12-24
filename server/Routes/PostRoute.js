const express = require('express');
const { createPost, getPost, updatePost, deletePost, timelinePost, likepost } = require('../controllers/PostController');
const router = express.Router();

router.post('/',createPost)
router.get('/:id',getPost)
router.put('/:id',updatePost)
router.delete('/:id',deletePost)
router.put('/:id/like',likepost)
router.get('/:id/timeline',timelinePost)
module.exports = router;
