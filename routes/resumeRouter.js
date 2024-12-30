import express from "express";
const router=express.Router();
import { createResume } from "../controllers/resumeController.js"; 
import { authenticate } from "../middlewares/authenticate.js";


//resume creation
router.post("/resume",authenticate,createResume);



export default router;