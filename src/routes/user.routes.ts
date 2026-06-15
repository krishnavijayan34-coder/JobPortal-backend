import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { getMe } from "../controllers/user.controller";

const router = Router();


router.get("/me", verifyToken, getMe);

export default router;
