const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const userSchema =new mongoose.Schema({

   
    name:{
        type:String,
        required:[true,"Please Enter a name"],
    },
    avatar:{
        public_id:String,
        url:String,
    },
    email:{
        type:String,
        required:[true,"Please Enter a valid E-mail"],
        unique:[true,"Email Already exists"],

    },
    password:{
        type:String,
        required:[true,"Please enter a password "],
        minlength:[6,"Password must be atleast 6 characters"],
        select:false,
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    resetpasswordtoken:String,
    resetpasswordexpire:Date,

     
});

userSchema.pre('save',async function(next){
    if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password,10);
    }
    next();

});
userSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateToken = function(){
    return jwt.sign({_id:this._id},"merakhudkacustomsecretkey")
}
userSchema.methods.getresetpasswordtoken = function (){

    const resettoken = crypto.randomBytes(20).toString('hex');
    console.log(resettoken);
    this.resetpasswordtoken = crypto.createHash('sha256').update(resettoken).digest('hex');
    this.resetpasswordexpire = Date.now()  + 10*60*1000;
    return resettoken;


}

module.exports = mongoose.model('User',userSchema)