const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Add comment
exports.addComment = async (req, res) => {
  const { comment } = req.body;
  const newComment = new Comment({
    comment,
    user: req.user._id,
    post: req.params.postId
  });
  await newComment.save();

  const post = await Post.findById(req.params.postId);
  post.comments.push(newComment);
  await post.save();

  res.redirect(`/posts/${req.params.postId}`);
};

// Delete comment
exports.deleteComment = async (req, res) => {
  await Comment.findByIdAndDelete(req.params.commentId);
  res.redirect(`/posts/${req.params.postId}`);
};
