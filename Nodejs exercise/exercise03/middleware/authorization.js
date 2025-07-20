
// middleware/authorization.js
// Middleware to authorize users based on their roles
export const authorizeAdmin = (...roles) => {
  return (req, res, next) => {
 
    if(!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden, you do not have the right permissions" });
    }
    next(); // Call the next middleware if the user has the required role
  };
}