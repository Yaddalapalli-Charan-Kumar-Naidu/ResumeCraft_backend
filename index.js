import express from "express";
const app=express();
import dbConnect from "./config/db.js";
import cors from 'cors';
import User from "./models/User.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import bcrypt from "bcryptjs"
//database connection
dbConnect();


//middlewares
app.use(express.json());
app.use(cors());

// Create a new user
const createUser = async () => {
  const hashedPassword = await bcrypt.hash("Pass@123", 10);
    const newUser = new User({
      name: "test2",
      email: "test2@gmail.com",
      password: hashedPassword,
      phoneNumber: "1234567890",
    });
  
    try {
      await newUser.save();  // Save the user to the database
      console.log("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error.message);  // Handle any errors (e.g., validation errors)
    }
  };
  
  // Call createUser to create a new user when the server starts
  // createUser();

//routes
app.use("/auth",authRouter);
app.use("/user",userRouter);

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
