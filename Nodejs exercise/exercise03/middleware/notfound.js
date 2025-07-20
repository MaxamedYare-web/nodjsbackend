
export const notfoundMiddleware = (req, res, next) => {
  res.status(404).json({ message: `router ${req.originalUrl} not found` });
  next();
}