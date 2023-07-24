const mongoose = require("mongoose");
var schema = new mongoose.Schema({
    name:{type:String,required:true},
    createdAt:{type : Date, default: new Date()},
    message:[{type:String,required:true}],
    likes:{type:Number,default:0},
    tag:{type:String,required:true},
    imagePath:{type:String,required:true}

});

schema.index({ name:"text" });
const Post=mongoose.model('post',schema)

module.exports=Post;