import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Name is required'], // Custom error message
      minlength: [3, 'Name must be at least 3 characters long'], // Custom validation
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // Ensures the email is unique in the database
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], // Validates email format
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'], // Custom validation
    },
    phoneNumber: {
      type: String,
    //   required: [true, 'Phone number is required'],
      match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'], // Validates phone number format
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    resumes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Resume", // Reference to the Resume schema
        },
      ],
    profilePicture: { type: String },
    otp:{
      type:String,
    },
    otpExpires:{
      type:Date,
    },
    isVerified:{
      type:Boolean,
      default:false,
    },
    role:{
      type:String,
      default:"customer"
    }
});
const User = mongoose.model('User', userSchema);
export default User;
