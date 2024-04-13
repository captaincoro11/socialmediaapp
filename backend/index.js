const express = require ('express');
const cookieParser = require('cookie-parser')
const app = express();
const cors = require('cors');

const corsConfig = {
    origin:"*",
    credential:true,
    methods:["GET","POST","PUT","DELETE"]

}


app.use(cors(corsConfig));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
const { connectDatabase } = require('./config/database');
const cloudinary = require('cloudinary')


const port = 3000;
connectDatabase();
cloudinary.config({
    cloud_name:'dbpg4ry3w',
    api_key:'624471431544462',
    api_secret:'Kac9GRnWSCYRUft3eLgsY0wBQSc'

})

app.listen(port, ()=>{
    console.log(`The server is running on port ${port}`);
});



module.exports = app;


