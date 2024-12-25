import express from "express"
const router=express.Router();
import {loginController,signupController} from "../controllers/authController.js"
import { validateLogin,validateSignup } from "../middlewares/validation.js";
import { upload } from "../middlewares/multerConfig.js";



router.post("/login",
    validateLogin,
    loginController);
router.post("/signup",
    upload.single("profilePicture"),
    validateSignup,
    signupController);

export default router;