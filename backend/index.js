const express = require ('express');
const cookieParser = require('cookie-parser')
const app = express();
const cors = require('cors');

app.use(cors({
    origin:'http://localhost:3000/',
    methods:['GET',"POST","PUT","DELETE"]
    
}))

require("dotenv").config({path:'backend/config/config.env'});
//Using Middlewares
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb',extended:true}))
app.use(cookieParser());
const post =require("./routes/post");
const user= require('./routes/user')
app.use('/api/v1',post)
app.use('/api/v1',user)

app.get('/',(req,res)=>{
    res.json("HELLO BABY")
})

module.exports = app;



