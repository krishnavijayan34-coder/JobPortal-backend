import { Router } from "express";
import { addJobSeekerSkill } from "../controllers/jobseekerskill.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

router.post("/", verifyToken, addJobSeekerSkill);


export default router;
