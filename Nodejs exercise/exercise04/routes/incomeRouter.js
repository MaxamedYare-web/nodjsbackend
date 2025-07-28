import express from "express"
import { createIncome, getINcome, incomeDelete, updateYoIncome } from "../controls/incomeControls.js"
import { protectRout } from "../middleware/protectRout.js"


const router = express.Router()

/**
 * @swagger
 * /income/create:
 *   post:
 *     summary: add new income
 *     tags: [Transaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - income
 *               - notes 
 *               - category
 *             properties:
 *               income:
 *                 type: number
 *               notes:
 *                 type: string
 *               category:
 *                 type: string
 *                  
 *              
 *  
 *     responses:
 *       201:
 *         description: User registered
 */
router.post("/create",protectRout,createIncome)

// get u income

/**
 * @swagger
 * /income:
 *   get:
 *     summary: Get you transaction income
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of transaction
 */
router.get("/",protectRout,getINcome)

// update u income

/**
 * @swagger
 * /income/update/{id}:
 *   put:
 *     summary: Update a transaction by ID
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Transaction ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               income:
 *                 type: number
 *               notes:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated
 */
router.put("/update/:id",protectRout,updateYoIncome)

// delete you income

/**
 * @swagger
 * /income/delete/{id}:
 *   delete:
 *     summary: Delete a transaction by ID
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Transaction ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction deleted
 */
router.delete("/delete/:id",protectRout,incomeDelete)

const incomeRouter = router
export default incomeRouter
