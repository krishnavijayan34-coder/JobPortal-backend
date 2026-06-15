import { Router } from "express";
import {createJob,getJobs,updateJob} from "../controllers/job.controller";
import {verifyToken} from "../middleware/auth.middleware";

const router =Router();

router.get("/",verifyToken,getJobs);
router.post("/",verifyToken,createJob);

router.patch("/:id", verifyToken,updateJob);

export default router;
