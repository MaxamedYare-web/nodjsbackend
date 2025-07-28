export const notFound = (req,res,next)=>{
    if(!req.hostName) return res.status(404).json({message:`router ${req.originalUrl} not found`})
        next()
}

// golobal error
export const globalErrorHandle = (err,req,res)=>{
    const status = res.statusCode || 500
    res.status(status).json({
        success:false,
        message:err.message || "there is errors global",
        status
    })
}