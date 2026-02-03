import exprees from "express";


import {AuthenticateToken} from "../middleware/isAuthenticated.js";
import { registercompany, updateCompany, getCompanyById, getAllCompanies } from "../controllors/company.controlleer.js";
import { singleUploaded } from "../middleware/multer.js"


const router = exprees.Router();

//route to register a company
router.post("/register",AuthenticateToken,registercompany);
router.get("/get",AuthenticateToken,getAllCompanies);
router.get("/get/:id",AuthenticateToken,getCompanyById);
router.put("/update/:id",AuthenticateToken, singleUploaded ,updateCompany);


export default router;