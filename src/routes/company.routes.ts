import { Router } from "express";
import { createCompany, getCompanies } from "../controllers/company.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

router.post("/", verifyToken, createCompany);

router.get("/", verifyToken,getCompanies);

export default router;
