import express from "express"
const router=express.Router();
import {loginController} from "../controllers/authController.js"
import { validateLogin } from "../middlewares/validation.js";

router.post("/login",validateLogin,loginController);
// router.post("/signup",signupController);

export default router;