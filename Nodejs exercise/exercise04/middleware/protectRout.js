import jwt from "jsonwebtoken"
import authUser from "../models/authSchema.js"

export const protectRout = async (req,res,next)=>{
   
const token = req.headers.authorization?.split(" ")[1]
try {
    if(!token) return res.status(401).json({message:"token is invalid or expired"})
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await authUser.findById(decoded.id).select("-password")
next()
} catch (error) { 
    res.status(400).json({message:error.message})
}

}