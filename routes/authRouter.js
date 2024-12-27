import express from "express"
const router=express.Router();
import {loginController,signupController,verifyOtp} from "../controllers/authController.js"
import { validateLogin,validateSignup } from "../middlewares/validation.js";
import { upload } from "../middlewares/multerConfig.js";



router.post("/login",
    validateLogin,
    loginController);
router.post("/signup",
    upload.single("profilePicture"),
    validateSignup,
    signupController);
router.post("/verify-otp",
    verifyOtp);

export default router;