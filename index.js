import express from "express";
const app=express();
import dbConnect from "./config/db.js";
import cors from 'cors';
import User from "./models/User.js";
//database connection
dbConnect();


//middlewares
app.use(express.json());
app.use(cors());

// Create a new user
const createUser = async () => {
    const newUser = new User({
      name: "test1",
      email: "test1@gmail.com",
      password: "Pass@123",
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
//   createUser();


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
