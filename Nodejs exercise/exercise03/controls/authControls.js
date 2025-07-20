import User from "../models/authModels.js";
import { generateToken } from "../utils/generateToken.js";


// Function to register a new user
export const registerUser = async (req, res,next) => {
  let { name, email, password ,role} = req.body;

  try {
    email = email.toLowerCase(); // Normalize email to lowercase
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password, // Password will be hashed in the pre-save middleware
      role // Default role
    });

    const token = generateToken(newUser._id);
    if(!token) {
      return res.status(500).json({ message: "Token generation failed" });
    }

    // Respond with the created user and token
    res.status(201).json({ token });

    // Call next middleware
    // This is useful if you have other middlewares to handle after user registration
    next();
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });

  }
};

// user login function
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(404).json({ message: "User not found or password is invalid" });
    }

    const token = generateToken(user._id);
    if (!token) {
      return res.status(500).json({ message: "Token generation failed" });
    }

    // Respond with the user data and token
    res.status(200).json({ token });
    // Call next middleware
    next();
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal server error" });
  } 

}
