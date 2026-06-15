const jwt=require('jsonwebtoken')
require('dotenv').config();

const authMiddleware = async(res,req,next)=>{
    try{
        const {token} = req.cookies // get token from cookies
        if(!token){
            return res.status(401).json({
                message:'Access denied. No token provided.'
            })
        };

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.user =decoded//attach user data to request
        next();

    }catch(error){
        res.status(400).json({
            message:'Invalid Token'
        })
    }

};

module.exports = authMiddleware; 