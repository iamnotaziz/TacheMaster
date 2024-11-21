import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/database.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

dbConnect();

app.use(express.json());

app.use('/api/users/', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
