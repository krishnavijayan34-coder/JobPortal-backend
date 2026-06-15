import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createProfile = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const { contactNumber, qualification, experience } = req.body;

  const profile = await prisma.jobSeeker.create({
    data: {
      userId: user.userId,
      contactNumber,
      qualification,
      experience,
    },
  });

  
  res.json(profile);
};
export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const profile = await prisma.jobSeeker.findUnique({
      where: { userId: user.userId },
      include: {
        user: true,
      },
    });

    if (!profile) {
      return res.status(400).json({ message: "JobSeeker profile not found" });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", err });
  }
};
export const updateProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const user = (req as any).user;

    const {
      contactNumber,
      qualification,
      experience,
    } = req.body;

    const profile = await prisma.jobSeeker.update({
      where: {
        userId: user.userId,
      },
      data: {
        contactNumber,
        qualification,
        experience :Number(experience),
      },
       include: {
        user: true,
       },
    });
    
    console.log("UPDATED PROFILE =", profile);

    return res.json(profile);
  } catch (err) {
    return res.status(500).json({
      message: "Error updating profile",
      err,
    });
  }
};