import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { profile, updateProfile } from "../controllers/userController.js";
import { upload } from "../middlewares/multerConfig.js";
const router=express.Router();


router.get(
    "/profile",
    authenticate,
    profile
);

router.put(
    "/update-profile",
    authenticate,
    upload.single("newProfilePicture"),
    updateProfile
);

export default router;