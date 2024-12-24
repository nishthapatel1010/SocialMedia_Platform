const mongoose = require("mongoose");
const postschema=new mongoose.Schema({
        userId:{
            type:String,
            required:true
        },
        desc:{
         type:String
        },
        likes:[],
        image:String,
},{timestamps:true});
const Post=mongoose.model("Post",postschema)
module.exports=Post;