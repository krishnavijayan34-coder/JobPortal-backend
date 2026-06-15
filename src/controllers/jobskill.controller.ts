import { Request, Response } from "express";
import prisma from "../config/prisma";

export const addJobSkill = async (req: Request, res: Response) => {
  const { jobId, skillId } = req.body;

  const data = await prisma.jobSkill.create({
    data: { jobId, skillId },
  });
  

  res.json(data);
};
