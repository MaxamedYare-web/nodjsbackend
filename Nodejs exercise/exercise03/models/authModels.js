import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// Define the user schema
// This schema will be used to create a User model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true,},
  email: {type: String,  required: true,   unique: true,},
  password: { type: String,  required: true, },
  role:{ type: String,  required: true,   enum: ["user", "admin"], default: "user" }
}, );

// Pre-save middleware for the user schema
// This middleware runs before saving a user document to the database
userSchema.pre("save", async function (next) {
  // This middleware can be used to hash the password before saving the user
  if (!this.isModified("password")) return next();
  // Hash the password using bcrypt
const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
// This method will be used to compare the provided password with the hashed password in the database
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create the User model from the schema
// This model will be used to interact with the users collection in MongoDB
const User = mongoose.model("User", userSchema);
export default User;
