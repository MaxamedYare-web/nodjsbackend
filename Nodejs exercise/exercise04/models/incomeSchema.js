import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    income:{
        type:Number,
        require:true
    },
    notes:String,
    category:{
        type:String,
        enum:["allowance","business","bonus","invesment income","salary"],
        default:"allowance"
    },
    paymentMethod:{
        type:String,
        enum:["bank","card","cash"],
        default:"card"
    },
    dataCreated:String,
    creatorBy:{type:mongoose.Types.ObjectId}  
})

const addIncome = mongoose.model("income",incomeSchema)
export default addIncome