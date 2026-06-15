import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createSkill = async (req: Request, res: Response) => {
  const { skillName } = req.body;

  const skill = await prisma.skill.create({
    data: { skillName },
  });

  res.json(skill);
};


export const getSkills = async (_: Request, res: Response) => {
  const skills = await prisma.skill.findMany();
  res.json(skills);
};
