const express= require('express');
const app = express();
const mongoose=require('mongoose');
const cors = require('cors');
const PORT=8080;

mongoose.connect('mongodb://127.0.0.1/Finaldb2',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
//changed !!!!  build in our way NOT atlas !!!!! 
//Create a Finaldb in Mongoose pls

mongoose.connection.on('connected',()=>{
    console.log("connected")
});

app.use(cors());

require('./models/user');
require('./models/post');
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));


app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})