import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import recordRoute from './routes/recordRoute.js';
import errorHandler from './middlewares/errorMiddleware.js';
import connectDB from './config/db.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/users', userRoute);
app.use('/api/records', recordRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
