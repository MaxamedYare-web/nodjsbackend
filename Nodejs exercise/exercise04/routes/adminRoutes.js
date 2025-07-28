import express from "express"
import { protectRout } from "../middleware/protectRout.js"
import authAdmin from "../middleware/admin.js"
import { adminDeleteTransaction, adminGetAllIncomes, adminUpdateUser, getUsers, userRemove } from "../controls/adminControls.js"



const router  = express.Router()

// this is for admin get all users
// only admin can access this route

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get current user profile
 *     tags: [Admin Panel]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user info
 */
router.get("/users",protectRout,authAdmin("admin"),getUsers)

// this is for admin update user


/**
 * @swagger
 * /admin/users/update/{id}:
 *   put:
 *     summary: admin Update a user by ID
 *     tags: [Admin Panel]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: user ID
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
router.put("/users/update/:id",protectRout,authAdmin("admin"),adminUpdateUser)

// this is for admin remove user

/**
 * @swagger
 * /admin/users/remove/{id}:
 *   delete:
 *     summary: admin Delete user account you need
 *     tags: [Admin Panel]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: user ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: user deleted
 */
router.delete("/users/remove/:id",protectRout,authAdmin("admin"),userRemove)

// get all transactions income users

/**
 * @swagger
 * /income:
 *   get:
 *     summary: Admin Get all user transaction income
 *     tags: [Admin Panel]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of user transaction
 */
router.get("/incomes",protectRout,authAdmin("admin"),adminGetAllIncomes)

// delete transactions 


/**
 * @swagger
 * /admin/incomes/delete/{id}:
 *   delete:
 *     summary: admin Delete user transaction
 *     tags: [Admin Panel]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: transaction ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction deleted
 */
router.delete("/incomes/delete/:id",protectRout,authAdmin("admin"),adminDeleteTransaction)

const adminRouter = router
export default adminRouter

