import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { validationResult } from "express-validator";

export const loginController = async (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    // Check if user exists
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(404).json({ msg: "User not found. Please sign up" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: userData._id, email: userData.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Send success response
    res.status(200).json({ msg: "Login successful", token });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};


export const signupController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, email, password, phoneNumber } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password || !phoneNumber) {
        return res
            .status(400)
            .json({ msg: "Name, email, password, and phone number are mandatory fields" });
        }

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ msg: "Email is already registered" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        });

        await newUser.save();

        res.status(201).json({ msg: "Successfully created user account" });
    } catch (err) {
        console.error("Error during signup:", err.message);
        res.status(500).json({ msg: "Internal server error" });
    }
};
