import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createCompany = async (req: Request, res: Response) => {
  const { companyName, location } = req.body;

  const user = (req as any).user;
  

  const company = await prisma.company.create({
    data: {
      companyName,
      location,
      userId: user.userId,
    },
  });

  res.json(company);
};


export const getCompanies = async (req: Request, res: Response) => {
  const companies = await prisma.company.findMany();
  res.json(companies);
};