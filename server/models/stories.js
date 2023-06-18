const mongoose=require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const storiesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    location:{
        type:String,
    },
    likes: [{type:ObjectId, ref:"User"}],
    comments: [{
                 text: String,
                 postedBy: {type:ObjectId,ref:"User"}

    }],
    postedBy:{
        type:ObjectId,
        ref:"User"
    }
},{timestamps:true})
mongoose.model("Story",storiesSchema);
