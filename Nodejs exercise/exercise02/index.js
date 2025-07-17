const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const userRouter = require("./routes/userRoutes")
const app = express()
const port = process.env.PORT

mongoose.connect(process.env.MONGODB_URL)
   .then(()=>console.log("✅MongoDB was connected"))
   .catch(()=>console.log("😥mongodb not connected sorry"))

app.listen(port,()=>{
    console.log(`service is running http://localhost:${port}`)
})

app.use(express.json()) //midleware

app.use("/books",userRouter)







