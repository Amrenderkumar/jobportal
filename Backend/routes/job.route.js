import express from "express";

import {AuthenticateToken} from "../middleware/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllors/job.controller.js";

const router = express.Router();

router.post("/post", AuthenticateToken, postJob);
router.get("/get", AuthenticateToken, getAllJobs);
router.get("/getadminjobs", AuthenticateToken, getAdminJobs);
router.get("/get/:id", AuthenticateToken, getJobById);
export default router;