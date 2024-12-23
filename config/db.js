import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const dbConnect = async () => {
  try {
    const url = process.env.MONGO_URL;
    if (!url) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }
    //connect to online mongodb database
    await mongoose.connect(url);

    console.log("Database connection successful");
  } catch (err) {
    console.error("Error during database connection:", err.message);
  }
};

export default dbConnect;
