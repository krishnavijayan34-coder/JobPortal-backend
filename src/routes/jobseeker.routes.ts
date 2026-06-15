import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { createProfile,getProfile,updateProfile } from "../controllers/jobseeker.controller";

const router = Router();


router.post("/profile", verifyToken, createProfile);

router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);
export default router;
