

// middleware/admin.js 
 const authAdmin = (...roles)=>{

  // this middleware checks if the user has the required role
  // if not, it returns an error response
  return(req,res,next)=>{
    if(!roles.includes(req.user.role)) return res.status(401).json({message:`access denied you are not  ${roles.join(",")}`})
        next()
  }
}

export default authAdmin;

