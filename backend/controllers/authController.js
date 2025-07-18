import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// import { JWT_SECRET } from '../index.js';
import { JWT_SECRET } from '../config.js';

// const JWT_SECRET = process.env.JWT_SECRET;

//sign up controller 
export const signup = async (req ,res) =>{
    try {
        const {username , email , password} = req.body;
        
        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({
                message : "User already Exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        // const newUser = await User.create({username , email , password: hashedPassword});

        const newUser = new User({username , email , password : hashedPassword});
        await newUser.save();

        return res.status(201).json({
            message : "Signup Successful"
        })

    } catch (e){
        return res.status(500).json({
            message : "Signup Failed",
            error : e.message
        })
    }
}

//login controller
export const login = async (req, res)=>{
    try{
        const {email , password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message : "Email Not Registered"
            })
        }

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            return res.status(400).json({
                message : "Password doesn't match"
            })
        }

        const token = jwt.sign({id:user._id}, JWT_SECRET , {'expiresIn' : '3h'});

        return res.status(200).json({
            token,
            user:{
                id: user._id,
                username : user.username,
                email : user.email
            }
        })

    } catch(e){
        return res.status(500).json({
            message : "Login Failed",
            error : e.message
        })
    }
}

//logout controller
export const logout = (req ,res) =>{
    return res.status(200).json({ message: 'Logout successful (handled on frontend)' });
}