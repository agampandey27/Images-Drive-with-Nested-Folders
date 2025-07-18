import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

// const JWT_SECRET = process.env.JWT_SECRET ;

export const verifyToken = (req, res , next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            message : "Unauthorized: No token provided"
        })
    }

    const token = authHeader.split(' ')[1];

    try{
        const decode = jwt.verify(token , JWT_SECRET);
        req.user = decode
        next();
    }catch(e){
        return res.status(401).json({
            message : "Invalid Token",
            error : e.message
        })
    }
}