import jwt from 'jsonwebtoken';
import User from '../models/authModels.js';

// Middleware to protect routes
// This middleware will check if the user is authenticated
export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  // Verify the token (you can use a library like jsonwebtoken)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // Attach the user information to the request
    next(); // Call the next middleware
  } catch (error) {
    return res.status(401).json({ message: error.message || "Not authorized, token failed" });
  }
};
