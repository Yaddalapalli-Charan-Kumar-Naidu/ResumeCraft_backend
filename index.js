import express from "express";
const app=express();
import dotenv from "dotenv";
dotenv.config();
import dbConnect from "./config/db.js";
import cors from 'cors';
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import resumeRouter from "./routes/resumeRouter.js";
import templateRouter from "./routes/templateRouter.js";
import path from "path";
import { fileURLToPath } from "url";
//database connection
dbConnect();


//middlewares
app.use(express.json());
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//routes
app.use("/auth",authRouter);
app.use("/user",userRouter);
app.use("/resume",resumeRouter);
app.use("/template",templateRouter);

// Global error handler (must be after all routes and middleware)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  });


//port
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`app is running at http://localhost:${PORT}`);
})
