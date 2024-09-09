const Post = require('../models/Post');

// Create a post
exports.createPost = async (req, res) => {
  try {
    const { stockSymbol, title, description, tags } = req.body;
    const post = new Post({
      stockSymbol, title, description, tags, user: req.user._id
    });
    await post.save();
    res.redirect('/dashboard');
  } catch (err) {
    res.status(400).json({ error: 'Error creating post' });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  const { stockSymbol, tags, sortBy } = req.query;
  const filter = {};
  if (stockSymbol) filter.stockSymbol = stockSymbol;
  if (tags) filter.tags = tags;

  const posts = await Post.find(filter).sort(sortBy === 'likes' ? { likesCount: -1 } : { createdAt: -1 });
  res.render('dashboard', { posts });
};

// Get a post by ID with comments
exports.getPostById = async (req, res) => {
  const post = await Post.findById(req.params.postId).populate('comments');
  res.render('postDetails', { post });
};
