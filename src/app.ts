import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import jobseekerRoutes from "./routes/jobseeker.routes";
import companyRoutes from "./routes/company.routes";
import jobRoutes from "./routes/job.routes";
import applicationRoutes from "./routes/application.routes";
import skillRoutes from "./routes/skill.routes";
import jobSkillRoutes from "./routes/jobskill.routes";
import jobSeekerSkillRoutes from "./routes/jobseekerskill.routes";
import savedJobRoutes from "./routes/savedjob.routes";
dotenv.config();


const app = express();


app.use(cors());

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/jobseeker", jobseekerRoutes);
app.use("/api/company", companyRoutes);


app.use("/api/jobs",jobRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/skill", skillRoutes);
app.use("/api/job-skill", jobSkillRoutes);
app.use("/api/jobseeker-skill", jobSeekerSkillRoutes);
app.use("/api/saved-job", savedJobRoutes);
app.get("/", (req, res) => {
  res.send("Job Portal API is running ");

});


export default app;