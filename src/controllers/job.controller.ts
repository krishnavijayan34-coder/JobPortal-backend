import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createJob = async (req: Request, res: Response) => {
  try {
    const { title, description, salary, location, jobType, companyId,experience } =
      req.body;

    const user = (req as any).user;

    
    if (user.role !== "EMPLOYER") {
      return res.status(403).json({ message: "Access denied" });
    }

    const job = await prisma.job.create({
      data: {
        title,
        description,
        salary,
        location,
        jobType,
        companyId:Number(companyId),
        experience:Number(experience),
      },
    });

    return res.status(201).json(job);
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
};

export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        company: true,
      },
    });

    return res.json(jobs);
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
};
export const updateJob = async (req: Request, res: Response) => {
  try {
    const jobId = Number(req.params.id);

    const updatedJob = await prisma.job.update({
      where: {
        jobId: jobId,
      },
      data: {
        experience:Number(req.body.experience),
      },
    });

    return res.json(updatedJob);
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      err,
    });
  }
};
