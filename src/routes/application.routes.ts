import express from "express";
import {
  applyJob,
  myApplications,
  getApplicationsByJob,
  getEmployerApplications,
} from "../controllers/application.controller";

import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

// JobSeeker
router.post("/apply", verifyToken, applyJob);
router.get("/my", verifyToken, myApplications);
router.get("/job/:jobId", verifyToken, getApplicationsByJob);

// Employer
router.get("/", verifyToken, getEmployerApplications);

export default router;
