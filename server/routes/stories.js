const express= require('express');
const router = express.Router();
const mongoose=require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const  Stories  = mongoose.model("Story");

router.get('/allstories',requireLogin,(req,res)=>{
    Stories.find().populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then(posts=>{
        //populate=> expand 
        res.json({posts})
        //posts:[{p1,p2}]
    }).catch(err=>{console.log(err)})
})

router.get('/getsubstories',requireLogin,(req,res)=>{
    //if postedBy in following
    Stories.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then(posts=>{
        //populate=> expand 
        res.json({posts})
        //posts:[{p1,p2}]
    }).catch(err=>{console.log(err)})
})

router.post('/createstory',requireLogin,(req,res)=>{

    const {pic} = req.body;
    console.log(pic)
    
    if(!pic){

        return res.status(422).json({error:"pls add all fields"});
    }
    
    req.user.password=undefined;

    //delete password
    const post = new Stories({
        title:pic
    })
   
    post.save().then(result=>{

        res.json({post:result})

    }).catch(err=>{

        console.log(err)
    });
})

router.get('/mystories',requireLogin,(req,res)=>{

    Stories.find({postedBy:req.user._id}).populate("postedBy","_id name").then(mypost=>{
        res.json({mypost});
    }).catch(err=>{console.log(err)});
})

router.put('/like',requireLogin,(req,res)=>{
    Stories.findByIdAndUpdate(req.body.postId,{
    $push : {likes:req.user._id}
    },{
        new:true
    }).populate("postedBy").exec((err,result)=>{
        console.log(result);
        if(err){
            return res.status(422).json({error:err})

        }
        else{
            res.json(result)
        }

    })

})

router.put('/comment',requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy: req.user._id

    }
    Stories.findByIdAndUpdate(req.body.postId,{
    $push : {comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy", "_id name")
    
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})

        }
        else{
            res.json(result)
        }

    })

})

router.put('/unlike',requireLogin,(req,res)=>{
    Stories.findByIdAndUpdate(req.body.postId,{
    $pull : {likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})

        }
        else{
            res.json(result)
        }

    })

})

router.delete('/deletestories/:postID',requireLogin,(req,res)=>{
    Stories.findOne({_id:req.params.postID})
.populate("postedBy","_id")
.exec((err,post)=>{
    if(err){
     return res.status(422).json({error:err})

    }
    if(post.postedBy._id.toString() === req.user._id.toString()){
        post.remove()
        .then(result=>{
         res.json(result)

        }).catch(err=>{
            console.log(err)

        })
    }

})
})
module.exports=router