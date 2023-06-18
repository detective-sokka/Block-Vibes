const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
    walletId:{
        type:String,
        required:true
    },
    reputation: {

        type: Number        
    }    
})

mongoose.model("User",userSchema);