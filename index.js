import express from "express";
const app=express();
import dbConnect from "./config/db.js";
import cors from 'cors';
//database connection
dbConnect();


//middlewares
app.use(express.json());
app.use(cors());


// Global error handler (must be after all routes and middleware)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  });


//port
const PORT=8267;
app.listen(PORT,()=>{
    console.log(`app is running at http://localhost:${PORT}`);
})
