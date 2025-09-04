const Post = require('../Models/post')

exports.getallposts = async (req,res) =>{
    try {
    const posts = await Post.find().populate("author","name email");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}