import express from "express"
import { createNewUser,  login, updateUser } from "../controls/authControls.js"
import { validate } from "../middleware/validate.js"
import { createUserZod, loginZod } from "../models/validateZos.js"
import { protectRout } from "../middleware/protectRout.js"
import { upload } from "../middleware/upload.js"
import { uploadFile } from "../controls/uploadControls.js"



const router  = express.Router()

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name 
 *               - username
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 */
router.post("/register",validate(createUserZod),createNewUser)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged-in was successfully
 */
router.post("/login",validate(loginZod),login)

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user info
 */
router.get("/profile",protectRout,(req,res)=>{
    res.status(200).json( {user:req.user})
})


/**
 * @swagger
 * /auth/update/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: user updated
 */
router.put("/update/:id",protectRout,updateUser)

// upload image from swagger api
/**
 * @swagger
 * /auth/editprofile:
 *   post:
 *     summary: upload user profile image
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file 
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile image uploaded successfully
 *       500:
 *         description: Server error
 */
router.post("/editprofile",protectRout,upload.single("file"),uploadFile)



const authUserRoute = router
export default authUserRoute
