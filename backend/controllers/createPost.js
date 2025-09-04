const Post = require("../Models/post");

exports.createPost = async (req,res) => {
try  {
  const {title,content,tags} = req.body;
  const userId = req.userID;
  const newPost = new Post({
    title,
    content,
    tags,
    author: userId,
  })
  await newPost.save();
  res.status(201).json({ message: 'Post save successfully' });
}catch (error) {
    res.status(500).json({ error: error.message });
  }
}
