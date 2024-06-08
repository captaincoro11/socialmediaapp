const user = require ('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({});




exports.isAuthenticated = async(req,res,next)=>{
    try {
        const authHeader = req.headers.authorization;
    
        if (!authHeader) {
            return res.status(401).json({ success: false, message: "Authorization header is missing" });
        }
    
        const token = authHeader.split(' ')[1];
    
        if (!token) {
            return res.status(401).json({ success: false, message: "Token is missing" });
        };

        console.log("token",token);
    const decoded  = jwt.verify(token,"customsecret")
    req.user =await user.findById(decoded._id)
    next();
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Please Singup "
        })
        
    }
}
