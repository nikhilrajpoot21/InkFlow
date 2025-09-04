const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    },
    tags:{
        type:[String],
        default:[]
    },
    createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", postSchema);