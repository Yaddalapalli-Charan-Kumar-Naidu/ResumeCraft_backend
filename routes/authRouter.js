import express from "express"
const router=express.Router();
import {loginController,signupController} from "../controllers/authController.js"
import { validateLogin,validateSignup } from "../middlewares/validation.js";

router.post("/login",validateLogin,loginController);
router.post("/signup",validateSignup,signupController);

export default router;