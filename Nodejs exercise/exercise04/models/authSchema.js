import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const authSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profileImage:{
        type:String,
        default:""
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
      enum:["admin","user"],
      default:"user"
    }
   
})

// before registered
authSchema.pre("save",async function(next){
if(!this.isModified("password")) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

// password compare
authSchema.methods.comparePassword = async function(conditionPassword){
    return bcrypt.compare(conditionPassword,this.password)
}

const authUser = mongoose.model("authUser",authSchema)
export default authUser