const express = require('express')
const router = express.Router()
const Post = require('../Models/post');
const { createPost } = require('../controllers/createPost');
const  authMiddleware  = require("../middleware/authmiddleware");
const {getUserPosts,getPostById, getAllPosts} = require('../controllers/postcontroller')


router.post('/',authMiddleware, createPost);
router.get('/',getAllPosts)
router.get('/user',authMiddleware,getUserPosts)
router.get('/:id',getPostById)

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Only author can delete
    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router