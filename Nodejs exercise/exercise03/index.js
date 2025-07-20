import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRout.js';
import { notfoundMiddleware } from './middleware/notfound.js';
import { errorHandler } from './middleware/errorHandles.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {

    // Options to avoid deprecation warnings
  useNewUrlParser: true,
//   useCreateIndex: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
}   ).catch((err) => {
  console.error('😒Error connecting to MongoDB:', err);
});

app.use("/auth", userRouter);
app.use(notfoundMiddleware)
app.use(errorHandler)