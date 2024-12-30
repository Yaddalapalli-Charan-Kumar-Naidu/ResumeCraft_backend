import express from "express";
const router=express.Router();
import {getAllTemplates} from "../controllers/templateController.js"


router.get("/",getAllTemplates);


export default router;