import authUser from "../models/authSchema.js";
import {generateToken} from "../utils/generateToken.js";


// register new user
export const createNewUser = async(req,res,next)=>{
    let {username,email} = req.body
    try { 
        const exitsE = await authUser.findOne({email})
        const exitsU = await authUser.findOne({username})
        if(exitsE) return res.status(401).json({
            message:"this email already have token please use another email"
        })
        if(exitsU) return res.status(401).json({
            message:"username already have token use another username"
        })
        const createdUser = await  authUser.create(req.body)
      
        if(!createdUser) return res.status(401).json({message:"register was failed Try again"})
        const token =  generateToken(createdUser._id)
        if(!token) return res.json({message:"token not found"})
            res.status(201).json({token})
        next()
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

// user login controls
export const login = async(req,res,next)=>{
    let {username,password} = req.body
    try {
        username = username.toLowerCase()
        const user =await authUser.findOne({username})
        if(!user || !(await user.comparePassword(password))) return res.status(401).json({message:"username & password is invalid"})
            const token = generateToken(user._id)
        req.user =  user
        console.log("req.user waa",req.user)
        res.status(200).json({token})
        next()
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}



// update user
export const updateUser = async(req,res,next)=>{
    const {id} = req.params
    try {
        const searchUser = await authUser.findByIdAndUpdate(id,req.body,{new:true})
        if(!searchUser) return res.status(401).json({message:"userId not got, update was failed"})
            res.status(200).json({searchUser})
        next()
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}


