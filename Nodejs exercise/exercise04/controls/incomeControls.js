import addIncome from "../models/incomeSchema.js"


// add and create new income
export const createIncome = async (req,res,next)=>{
    const data = new Date().toISOString()
    let {income,notes} = req.body
    try {
        const incomeC = await addIncome.create({income,notes,dataCreated:data,creatorBy:req.user._id})
        if(!incomeC) return res.status(401).json({message:"income create was failed please try again"})
      res.status(201).json({incomeC})
      next()
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

// get you income
export const getINcome = async (req,res,next)=>{
    try {
        const uIncome = await addIncome.find({creatorBy:req.user._id})
        console.log(req.user)
        console.log(uIncome)
        if(uIncome == "") return res.status(404).json({message:"you doin't have any icome , to add click here"})
            res.status(200).json({uIncome})
        next()
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// update you income
export const updateYoIncome = async (req,res,next)=>{
    const {id} = req.params
   try {
     const upIncome = await addIncome.findOneAndUpdate({_id:id,creatorBy:req.user._id},req.body,{new:true})
     res.json({upIncome})
     next()
   } catch (error) {
    res.status(401).json({message:error.message})
   }
}

// delete you income
export const incomeDelete = async (req,res,next)=>{
    const {id} = req.params
    try {
         await addIncome.findOneAndDelete({_id:id,creatorBy:req.user._id})
        res.status(200).json({message:`successful you incomeId ${id} was deleted`})
        next()
    } catch (error) {
        res.json({message:error.message})
    }
}