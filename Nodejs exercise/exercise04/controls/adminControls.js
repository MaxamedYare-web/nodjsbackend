import authUser from "../models/authSchema.js"
import addIncome from "../models/incomeSchema.js"



// all user
export const getUsers = async(req,res,next)=>{
    try {
        const users = await authUser.find()
        res.status(200).json({users})
        next()
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

// delete user 
export const userRemove = async(req,res,next)=>{
    const {id} = req.params
    try {
        const user = await authUser.findByIdAndDelete(id)
        if(!user) return res.status(401).json({message:"failed userid not got"})
            res.status(200).json({message:"user account was deleted"})
        next()
    } catch (error) {
        res.status(400).json({message:error})
    }
}

// admin update user
export const adminUpdateUser = async (req,res,next)=>{
    const {id} = req.params
    try {
        const up = await authUser.findByIdAndUpdate(id,req.body,{new:true})
        if(!up) return res.status(401).json({message:`userid ${id} not found please check proply`})
        res.status(200).json({message:"successfully admin was updated user"})
        next()
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

// get all incomess transactions
export const adminGetAllIncomes = async(req,res,next)=>{
    try {
        const allIncomes = await addIncome.find()
        res.json({allIncomes})
    } catch (error) {
        next(error)
    }
}

// admin delete user transactions you need
export const adminDeleteTransaction = async(req,res,next)=>{
    const {id} = req.params
    try {
        const dT = await addIncome.findByIdAndDelete(id)
        if(!dT) return res.status(404).json({message:`error this id ${id} not found`})
        res.json({message:`succefully this transaction id ${id} was deleted`})
    next()
    } catch (error) {
        res.json({message:error.message})
    }
}