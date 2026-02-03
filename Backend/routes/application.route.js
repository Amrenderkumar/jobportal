import express from "express";


import {AuthenticateToken} from "../middleware/isAuthenticated.js";
import { applyJob, getApplicant, getAppliedJobs, updateApplicant } from "../controllors/application.controller.js";



const router = express.Router();

//route to register a company
router.post("/apply/:id", AuthenticateToken, applyJob);
router.get("/get",AuthenticateToken,getAppliedJobs);
router.get("/:id/applicants",AuthenticateToken,getApplicant);
router.post("/status/:id/update",AuthenticateToken,updateApplicant);


export default router;