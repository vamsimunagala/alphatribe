const express = require('express');
const router = express.Router({ mergeParams: true });
const commentController = require('../controllers/commentController');

router.post('/', commentController.addComment);
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
