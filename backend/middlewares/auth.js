const user = require ('../models/user');
const jwt = require('jsonwebtoken');




exports.isAuthenticated = async(req,res,next)=>{
    try {
        const authHeader = req.headers.authorization;
    
        if (!authHeader) {
            return res.status(401).json({ success: false, message: "Authorization header is missing" });
        }
    
        const token = authHeader.split(' ')[1];
    
        if (!token) {
            return res.status(401).json({ success: false, message: "Token is missing" });
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
