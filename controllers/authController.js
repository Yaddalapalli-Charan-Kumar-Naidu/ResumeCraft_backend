import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { validationResult } from "express-validator";
import { generateOTP, sendOTPEmail } from '../utils/otpHelper.js';


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
        const profilePicture = req.file ? req.file.path : null;

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const otp = generateOTP();
        const otpExpires = Date.now() + 10 * 60 * 1000;

        // Create a new user
        const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        profilePicture,
        otp,
        otpExpires,
        });
        await sendOTPEmail(email, otp);

        await newUser.save();


        
        // console.log("otp sent");
        res.status(201).json({ message: 'User registered successfully. OTP sent to your email.' });
        
    } catch (err) {
        console.error("Error during signup:", err.message);
        res.status(500).json({ msg: "Internal server error" });
        
    }
};


export const verifyOtp=async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if OTP is valid
    if (!user.otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP and set expiration time
    const otp = generateOTP();
    const otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    user.otp = otp;
    user.otpExpires = otpExpires;

    // Save user with updated OTP details
    await user.save();

    // Send OTP email
    await sendOTPEmail(email, otp);

    // Respond to the client
    res.status(200).json({ message: "OTP sent to your email address" });
  } catch (error) {
    console.error("Error in forgot password:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate OTP and expiration time
    if (!user.otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password and clear OTP
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in reset password:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
