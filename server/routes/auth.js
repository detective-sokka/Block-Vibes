const express= require('express');
const router = express.Router();
const mongoose=require('mongoose');
const User=mongoose.model("User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const{JWT_SECRET}=require('./../keys');


router.post('/signup',(req,res)=>{
    const {name,email,password,admin, premium}=req.body;
    //get req information
    if(!email||!password||!name){
        return res.status(422).json({error:"please add all fields"});
    }//check if missing data
    User.findOne({email:email}).then((savedUser)=>{
        //find one with same email or get undefine 
        if(savedUser){//found with same email
            return res.status(422).json({error:"user already exists with that email"})
        } 
        bcrypt.hash(password,12).then(hashedpassword=>{//hash the pasword so we cannot see in the backend,protect user privacy
            const user=new User({
                email,
                password:hashedpassword,
                name,
                admin, 
                premium
            });
            user.save().then(user=>{// model build-in function to save the data
                res.json({message:"saved"})
            }).catch(err=>{
                console.log(err)
            });
        })
    }).catch(err=>{console.log(err)});
    //res.json({message:"posted"});
})
router.post('/signin',(req,res)=>{
    const {email,password} = req.body;
    //get req information
    if(!email ||!password){
        res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email}).then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password).then(doMatch=>{
            //compare the password true if it matches 
            if(doMatch){
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET);                
                const {_id,name,email,admin,followers,following, premium}=savedUser
                res.json({token,user:{_id,name,email,admin,followers,following, premium}});
                //response with web token,token is unique btween all user
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        }).catch(
            err=>{console.log(err)}
        )
    })
})
module.exports=router;