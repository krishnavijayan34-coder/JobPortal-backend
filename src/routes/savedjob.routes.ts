import express from "express";
import {
  saveJob,
  getSavedJobs,
  removeSavedJob,
} from "../controllers/savedjob.controller"; 

import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", verifyToken, saveJob);
router.get("/", verifyToken, getSavedJobs);
router.delete("/:id", verifyToken, removeSavedJob);

export default router;
