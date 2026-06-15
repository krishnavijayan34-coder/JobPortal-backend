import { Router } from "express";
import { addJobSkill } from "../controllers/jobskill.controller";

const router = Router();

router.post("/", addJobSkill);


export default router;
