import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getMe = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const data = await prisma.user.findUnique({
    where: { userId: user.userId },
  });

  res.json(data);
  
};
