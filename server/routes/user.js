const express= require('express');
const router = express.Router();
const mongoose=require('mongoose');
const  Post  = mongoose.model("Post");
const User = mongoose.model("User")



router.get('/user/:id',(req,res)=>{

    User.findOne({_id: req.params.id})
    .select("-password")
    .then(user=>{
    Post.find({postedBy:req.params.id})
    .populate("postedBy","_id name")
    .exec((err,posts)=>{

       if(err){
          return res.status(422).json({error:err})
         
       }
       res.json({user,posts})

    })
      

}).catch(err=>{

    return res.status(404).json({error:"User not found"})
})

})

router.get("/allUsers", (req, res) => {
    User.find()
      .then((posts) => {      
        res.json({ posts });      
      })
      .catch((err) => {
        console.log(err);
      });
});

router.put('/follow',(req,res)=>{

    User.findByIdAndUpdate(req.body.followId,{

        $push: {followers:req.user._id}

    },{
        new:true
    },(err,result)=>{
    
    if(err){
        return res.status(422).json({error:err})
    }
    User.findByIdAndUpdate(req.user._id,{

     
       $push:{following:req.body.followId}
    },{new:true}).select("-password").then(result=>{
        res.json(result)

    }).catch(err=>{

        return res.status(422).json({error:err})
    })
    
    }
    )
})
router.put('/unfollow',(req,res)=>{

    User.findByIdAndUpdate(req.body.unfollowId,{

        $pull: {followers:req.user._id}

    },{
        new:true
    },(err,result)=>{
    
    if(err){
        return res.status(422).json({error:err})
    }
    User.findByIdAndUpdate(req.user._id,{

     
       $pull:{following:req.body.unfollowId}
    },{new:true}).select("-password").then(result=>{
        res.json(result)

    }).catch(err=>{

        return res.status(422).json({error:err})
    })
    
    }
    )
})

router.delete("/deleteUser/:userID", (req, res) => {
    
    User.findOne({ _id: req.params.userID })
    .exec((err, post) => {

        console.log(err, post);
        
        if (err) {

          return res.status(422).json({ error: err });

        } 

        post.remove().then((result) => {

            res.json(result);

        }).catch((err) => {

            console.log(err);
            
        });        
    });

  });

router.put("/updatePremium", (req, res) => {
    
    Post.findByIdAndUpdate(
      req.body.user._id,
      {
        $set: { premium: req.user.premium },
      },
      {
        new: true,
      }
    ) 
    .exec((err, result) => {

        if (err) {

          return res.status(422).json({ error: err });

        } else {

          res.json(result);
        }
      });
  });

module.exports=router