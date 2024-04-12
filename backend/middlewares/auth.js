const user = require ('../models/user');
const jwt = require('jsonwebtoken');




exports.isAuthenticated = async(req,res,next)=>{
    try {
        const {token} = req.cookies;
        
        
     if(!token){
        return res.status(401).json({
            message:"Please Login First",
        });


     }
    const decoded  = await jwt.verify(token,"merakhudkacustomsecretkey")
    req.user =await user.findById(decoded._id)
    next();
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }
}