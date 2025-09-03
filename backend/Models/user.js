const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,    
    },
    username:{
        type:String,
        required:true,
        unique: true,   
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        unique: true,   
        lowercase: true
    },
    password:{
        type:String,
        required:true
    }
    
},{timestamps:true})

module.exports = mongoose.model('User', userSchema);