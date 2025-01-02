import express from "express";
const router=express.Router();
import { createResume,getUserResumes,updateResume,deleteResume } from "../controllers/resumeController.js"; 
import { authenticate } from "../middlewares/authenticate.js";


//resume creation
router.post("/",authenticate,createResume);

router.get("/",authenticate,getUserResumes);

router.put("/:id",authenticate,updateResume);

router.delete("/:id",authenticate,deleteResume);

export default router;