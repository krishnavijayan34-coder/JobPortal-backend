import { Request,Response } from "express";
import prisma from "../config/prisma";
import  bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req:Request,res:Response)=> {
    try {
        const {name,email,password,role}=req.body;
        console.log(req.body);
        const existingUser=await prisma.user.findUnique({
            where:{email},
        });
        
        if(existingUser){
          console.log("User already exists");
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const user = await prisma.user.create({
          
            data:{
                name,email,password:hashedPassword,role,
                
            },
        });
        console.log("Role =", role);
        if (role === "JOBSEEKER") {
            console.log("Creating JobSeeker Profile");
        await prisma.jobSeeker.create({
        data: {
        userId: user.userId,
        contactNumber: "",
        qualification: "",
        experience: 0,
        },
     });
      }
        console.log(user);
         return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log("user not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.userId, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return res.json({ token, user });
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });

    }
}
