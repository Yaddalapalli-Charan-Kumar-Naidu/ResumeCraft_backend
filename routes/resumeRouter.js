import express from "express";
const router=express.Router();
import { createResume,getUserResumes,updateResume,deleteResume } from "../controllers/resumeController.js"; 
import { authenticate } from "../middlewares/authenticate.js";


//resume creation
router.post("/resume",authenticate,createResume);

router.get("/resume",authenticate,getUserResumes);

router.put("/resume/:id",authenticate,updateResume);

router.delete("/resume/:id",authenticate,deleteResume);

export default router;