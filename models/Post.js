const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  stockSymbol: String,
  title: String,
  description: String,
  tags: [String],
  likesCount: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Post', postSchema);
