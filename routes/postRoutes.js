const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/posts', authMiddleware.authenticate, postController.createPost);
router.get('/posts', postController.getAllPosts);
router.get('/posts/:postId', postController.getPostById);

module.exports = router;
