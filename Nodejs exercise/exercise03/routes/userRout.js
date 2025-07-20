import express from 'express';
import { loginUser, registerUser } from '../controls/authControls.js';
import { protect } from '../middleware/protect.js';
import { authorizeAdmin } from '../middleware/authorization.js';

// Create a router for user-related routes
// This router will handle user registration and other user-related operations
const router = express.Router();

// Define a route for user registration
// This route will handle POST requests to /register
router.post("/register",registerUser)

// Define a route for user login
// This route will handle POST requests to /login
router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {
  res.status(200).json({ user: req.user });
});

router.get("/admin/dashboard", protect, authorizeAdmin("admin"), (req, res) => {
  res.status(200).json({ message: "Welcome to the admin dashboard" });
});

// Export the user router
// This allows the router to be used in the main application file (index.js)
const userRouter = router;

// Export the userRouter so it can be used in other files
export default userRouter;