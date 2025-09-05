const express = require('express')
const router = express.Router()
const { createPost } = require('../controllers/createPost');
const  authMiddleware  = require("../middleware/authmiddleware");
const {getUserPosts,getPostById, getAllPosts} = require('../controllers/postcontroller')


router.post('/',authMiddleware, createPost);
router.get('/',getAllPosts)
router.get('/user',authMiddleware,getUserPosts)
router.get('/:id',getPostById)

module.exports = router