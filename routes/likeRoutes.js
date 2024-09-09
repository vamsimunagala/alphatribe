const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Like a post
router.post('/posts/:postId/like', async (req, res) => {
  const post = await Post.findById(req.params.postId);
  post.likesCount += 1;
  await post.save();
  res.redirect(`/posts/${post._id}`);
});

module.exports = router;
