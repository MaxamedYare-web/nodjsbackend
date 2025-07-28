import authUser from "../models/authSchema.js"

// upload file resquest
export const uploadFile = async (req,res)=>{
  try {
     if(!req.file) return res.status(400).json({message:"no file uploaded"})
      const updateProfile =  await authUser.findByIdAndUpdate(req.user._id,{profileImage:req.file.path},{new:true})
      if(!updateProfile) return res.status(404).json({message:"user not found"})
        res.status(200).json({
       success:true,
       profileImage:updateProfile.profileImage
    })
   
   } catch (error) {
    res.status(401).json({
        success:false,
        message:error.message
    })
   }
}

