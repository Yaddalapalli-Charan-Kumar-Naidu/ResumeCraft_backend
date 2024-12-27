import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { profile } from "../controllers/userController.js";
const router=express.Router();


router.get(
    "/profile",
    authenticate,
    profile
);

export default router;