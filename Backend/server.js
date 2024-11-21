import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/database.js";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import fbRouter from "./routes/feedbackRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

dbConnect();

app.use(express.json());

app.use('/api/users/', userRouter)
app.use('/api/tasks/', taskRouter)
app.use('/api/feedbacks/', fbRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
