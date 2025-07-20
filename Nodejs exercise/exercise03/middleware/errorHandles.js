
// middleware/errorHandles.js
// This middleware handles errors in the application
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode).json({
    message: "Internal Server Error",
    error: err.message || "An unexpected error occurred",
    statusCode
  });
  next();
}