import { Request, Response } from "express";
import prisma from "../config/prisma";

// ==========================
// SAVE JOB (WITH DUPLICATE CHECK)
// ==========================
export const saveJob = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { jobId } = req.body;

  try {
    // 1. Find job seeker
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId: user.userId },
    });

    if (!jobSeeker) {
      return res.status(400).json({ message: "JobSeeker not found" });
    }

    // 2. Check duplicate save
    const existing = await prisma.savedJob.findFirst({
      where: {
        jobId: Number(jobId),
        jobSeekerId: jobSeeker.jobSeekerId,
      },
    });

    if (existing) {
      return res.status(200).json({
        message: "Job already saved",
        data: existing,
      });
    }

    // 3. Save job
    const saved = await prisma.savedJob.create({
      data: {
        jobId: Number(jobId),
        jobSeekerId: jobSeeker.jobSeekerId,
      },
    });

    res.json(saved);
  } catch (err) {
    res.status(500).json({
      message: "Error saving job",
      err,
    });
  }
};

// ==========================
// GET SAVED JOBS
// ==========================
export const getSavedJobs = async (req: Request, res: Response) => {
  const user = (req as any).user;

  try {
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId: user.userId },
    });

    if (!jobSeeker) {
      return res.status(400).json({ message: "JobSeeker not found" });
    }

    const savedJobs = await prisma.savedJob.findMany({
      where: {
        jobSeekerId: jobSeeker.jobSeekerId,
      },
      include: {
        job: true, // IMPORTANT for frontend
      },
    });

    res.json(savedJobs);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching saved jobs",
      err,
    });
  }
};

// ==========================
// DELETE SAVED JOB
// ==========================
export const removeSavedJob = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await prisma.savedJob.delete({
      where: {
        savedJobId: id, // IMPORTANT (NOT "id")
      },
    });

    res.json({ message: "Removed successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting saved job",
      err,
    });
  }
};
