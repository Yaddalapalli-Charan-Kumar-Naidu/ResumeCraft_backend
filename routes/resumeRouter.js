import express from "express";
const router=express.Router();
import { createResume } from "../controllers/resumeController"; 
import { authenticate } from "../middlewares/authenticate";


//resume creation
router.post("/resume",authenticate,createResume);



export default router;