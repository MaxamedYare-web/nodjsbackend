import express from "express"
import dotenv from "dotenv"
import authUserRoute from "./routes/authRoutes.js"
import { globalErrorHandle, notFound } from "./middleware/errorHandles.js"
import mongoose from "mongoose"
import incomeRouter from "./routes/incomeRouter.js"
import adminRouter from "./routes/adminRoutes.js"
import swaggerUI from "swagger-ui-express"
import { swaggerJSdOp } from "./utils/swagger.js"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import rateLimit from "express-rate-limit"
dotenv.config()

const port = process.env.PORT
const mongoDbUrl = process.env.MONGO_URL_DEV
const mongoDbUrl_Pro = process.env.MONGO_URL_PRO
const nodeEnv = process.env.NODE_ENV

const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors({
    origin: ["http://localhost:5000"]
}))

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later"

})
app.use("/docs",swaggerUI.serve,swaggerUI.setup(swaggerJSdOp))
app.use(limiter)

app.use("/auth",authUserRoute)
app.use("/income",incomeRouter)
app.use("/admin",adminRouter)
app.use("/s",(req,res)=>{
    res.json({
        message: "Welcome to the server"
    })
})




if(process.env.NODE_ENV === "development"){
   app.use(morgan("dev"))
}

mongoose.connect(nodeEnv == "development" ? mongoDbUrl : mongoDbUrl_Pro)
    .then(()=>{
        console.log("✅ MongoDB was connected")
        app.listen(port,()=>{
            console.log(`service is running htto://localhost:${port}`)
        })
    })


app.use(notFound)
app.use(globalErrorHandle)




