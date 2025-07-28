


export const validate = (schemaZod)=>(req,res,next)=>{
  const result = schemaZod.safeParse(req.body)
   if(!result.success){
    const formated = result.error.format()
    res.status(400).json({
        success:false,
        errors:Object.keys(formated).map(feild =>({
            feild,
            message:formated[feild]._errors
        }))
    })
   }
 next()
}