import { Router } from "express";
import { createSkill, getSkills } from "../controllers/skill.controller";

const router = Router();

router.post("/", createSkill);

router.get("/", getSkills);

export default router;
