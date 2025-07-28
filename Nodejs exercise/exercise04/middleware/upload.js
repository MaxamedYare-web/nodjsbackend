import {CloudinaryStorage} from "multer-storage-cloudinary"
import multer from "multer"
import cloudinary from "../utils/cloudnary.js"


const storage = new CloudinaryStorage({
    cloudinary,
    params:{
       folder:"exercise04",
       allowed_formats:["jpg","png","pdf","jpeg"]
    }
})

export const upload = multer({storage})