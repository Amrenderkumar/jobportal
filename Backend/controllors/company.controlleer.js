import Company from "../models/company.model.js";
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloud.js"
export const registercompany = async (req, res) => {
    try {
        const { companyname, description } = req.body;
        if (!companyname) {
            return res.status(400).json({
                error: "Company name is required",
            });
        }
        if (!description) {
            return res.status(400).json({
                error: "Description is required",
            });
        }
        let company = await Company.findOne({ name: companyname });
        if (company) {
            return res.status(404).json({
                error: "Company not found",
            });
        }


        company = await Company.create({
            companyname: companyname,
            description,
            userId: req.id
        });
        return res.status(201).json({
            message: "Company created successfully",
            company,
            success: true,
        });
    } catch (error) {
        console.log("Error in companyController:", error);
    }
}

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ userId: req.id });

    return res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    console.log("Get companies error:", error);
  }
};


//get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                error: "Company not found",
            });
        }
        return res.status(200).json({
            company,
        });
    } catch (error) {
        console.log("Error in getCompanyById:", error);
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;
        //cloudinary logic to be added later
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;


        const updatedData = { name, description, website, location, logo };

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            { $set: updatedData },
            { new: true }
        );
        if (!company) {
            return res.status(404).json({
                error: "Company not found",
            });
        }
        return res.status(200).json({
            message: "Company updated successfully",
            company,
        });
    } catch (error) {
        console.log("Error in updateCompany:", error);
    }
}