import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id;
        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required", status: false });
        }

        //check already applied
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job", status: false });
        }

        //check job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found", status: false });
        }
        //create application
        const application = await Application({
            job: jobId,
            applicant: userId,
        });
        await application.save();
        job.applications.push(application._id);
        await job.save();
        return res.status(201).json({
            message: "Job applied successfully",
            status: true,
            applicationId: application._id
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error", status: false });
    }
};


export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 })
            .populate({
                path: "job",
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: "companyId",
                    options: { sort: { createdAt: -1 } }
                },
            });
        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: "No applied jobs found", status: false });
        }

        return res.status(200).json({
            applications: applications,
            status: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error", status: false });
    }
};

export const getApplicant = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "companyId",
        });
        if (!job) {
            return res.status(404).json({ message: "Job not found", status: false });
        }
        const applications = await Application.find({ job: jobId }).populate({
            path: "applicants",
            options: { sort: { createdAt: -1 } }
        });
        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: "No applicants found", status: false });
        }
        return res.status(200).json({
            applications: applications,
            status: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error", status: false });
    }
};

export const updateApplicant = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ message: "Status is required", status: false });
        }

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: "Application not found", status: false });
        }

        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({
            application: application,
            message: "Application status updated successfully",
            status: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error", status: false });
    }
};