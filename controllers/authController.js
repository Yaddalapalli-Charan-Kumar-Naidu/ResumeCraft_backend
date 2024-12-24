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
