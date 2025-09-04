const express = require('express')
const router = express.Router()
const { createPost } = require('../controllers/createPost');
const  authMiddleware  = require("../middleware/authmiddleware");
const {getallposts} = require('../controllers/postcontroller')


router.post('/post',authMiddleware, createPost);
router.get('/post',getallposts)
// router.post()

module.exports = router