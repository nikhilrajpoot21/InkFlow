const Post = require('../Models/post')

exports.getUserPosts = async (req,res) =>{
    try {
    const posts = await Post.find({ author: req.user.id }).populate("author","name email");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name email");
    if (!post) {
      return res.status(404).json({ message: 'Post Not Found' }); // return here
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message }); // use err instead of error
  }
};

exports.getAllPosts = async (req,res)=>{
  try{
    const post = await Post.find().populate("author","name email").sort({createdAt : -1});
    res.status(200).json(post);
  }catch(err){
    res.status(500).json({ error: error.message });
  }
}