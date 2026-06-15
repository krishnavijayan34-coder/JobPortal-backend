import { Request, Response } from "express";
import prisma from "../config/prisma";

export const addJobSeekerSkill = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { skillId } = req.body;

  const jobSeeker = await prisma.jobSeeker.findUnique({
    where: { userId: user.userId },
  });

  if (!jobSeeker) {
    return res.status(400).json({ message: "JobSeeker not found" });
  }

  const data = await prisma.jobSeekerSkill.create({
    data: {
      jobSeekerId: jobSeeker.jobSeekerId,
      skillId,
    },
  });


  res.json(data);
};