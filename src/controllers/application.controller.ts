import { Request, Response } from "express";
import prisma from "../config/prisma";

// ===============================
// JOBSEEKER: APPLY JOB
// ===============================
export const applyJob = async (req: Request, res: Response) => {
  const { jobId } = req.body;
  const user = (req as any).user;


  try {
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId: user.userId },
    });

    if (!jobSeeker) {
      return res.status(400).json({ message: "JobSeeker profile not found" });
    }

    const application = await prisma.application.create({
      data: {
        jobId: Number(jobId),
        jobSeekerId: jobSeeker.jobSeekerId,
      },
    });

    return res.json(application);
  } catch (err) {
    return res.status(500).json({ message: "Error applying job", err });
  }
};

// ===============================
// JOBSEEKER: MY APPLICATIONS
// ===============================
export const myApplications = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const jobSeeker = await prisma.jobSeeker.findFirst({
      where: { userId: user.userId },
    });

    if (!jobSeeker) {
      return res.status(400).json({
        message: "JobSeeker not found for this user",
      });
    }

   const applications = await prisma.application.findMany({
  where: { jobSeekerId: jobSeeker.jobSeekerId },
  include: {
    job: true,
  },
});


    return res.json(applications);
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching applications",
      err,
    });
  }
};
// ===============================
// EMPLOYER: GET APPLICATIONS BY JOB
// ===============================
export const getApplicationsByJob = async (req: Request, res: Response) => {
  try {
    const jobId = Number(req.params.jobId);
const applications = await prisma.application.findMany({
  where: { jobId },
  include: {
    job: true,
    jobSeeker: {
      include: {
        user: true,  
      },
    },
  },
});

    return res.json(applications);
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching applications by job",
      err,
    });
  }
};

// ===============================
// EMPLOYER: ALL APPLICATIONS (FOR EMPLOYER DASHBOARD)
// ===============================
export const getEmployerApplications = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const employer = await prisma.company.findFirst({
      where: { userId: user.userId },
    });

    if (!employer) {
      return res.status(400).json({
        message: "Employer profile not found",
      });
    }

    const applications = await prisma.application.findMany({
  where: {
    job: {
      companyId: employer.companyId,
    },
  },
  include: {
    job: true,
    jobSeeker: {
      include: {
        user: true,   
      },
    },
  },
});

    return res.json(applications);
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching employer applications",
      err,
    });
  }
};