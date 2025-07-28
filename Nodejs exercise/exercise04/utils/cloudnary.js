import cloudnaryPP from "cloudinary"
const {v2:cloudinary} = cloudnaryPP
import dotenv from "dotenv"
dotenv.config()





cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API,
    api_secret: process.env.CLOUD_API_SECRET
})

export default cloudinary;