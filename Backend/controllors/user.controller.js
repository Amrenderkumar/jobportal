import User1 from '../models/user1.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cloudinary from '../utils/cloud.js';
import getDataUri from "../utils/datauri.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                error: "Missing required fields",
                success: false
            });
        }
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        const user = await User1.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "Email is already registered",
                success: false
            });
        }
        //convert password to hashed password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User1({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profileImage: cloudResponse.secure_url,
            }
        });

        await newUser.save();
        return res.status(201).json({
            message: `Account created successfully ${fullname}`,
            success: true
        });
    } catch (error) {
        if (error.code === 11000) {
            if (error.keyPattern.phoneNumber) {
                return res.status(400).json({
                    error: "Phone number already exists",
                    success: false
                });
            }
        }
        res.status(500).json({
            error: "server error registration failed",
            success: false
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                error: "Email, password and role are required",
                success: false
            });
        }
        const emailLower = email.toLowerCase();
        const user = await User1.findOne({ email: emailLower });
        if (!user) {
            return res.status(400).json({
                error: "Incorrect email or password",
                success: false
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                error: "Invalid email or password",
                success: false
            });
        }
        //check role correctly or not
        if (user.role !== role) {
            return res.status(403).json({
                error: `User is not registered as a ${role}`,
                success: false
            });
        }

        //generate jwt token
        const tokenData = {
            userId: user._id,
        };
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });

        const safeuser = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile || null
        };


        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "lax" }).json({
            message: `Welcome back! ${user.fullname}`,
            token,
            user: safeuser,
            success: true
        });
    } catch (error) {
        console.error("Error during user login:", error);
        res.status(500).json({
            error: "server error login failed",
            success: false
        });
    }
};


export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        console.error("Error during user logout:", error);
        res.status(500).json({
            error: "server error logout",
            success: false
        });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        //cloudinary upload


        let skillsArray;
        if (skills) {
            skillsArray = skills.split(',').map(s => s.trim());
        }

        const userId = req.id;    // middleware to set req.id from token
        let user = await User1.findById(userId);
        if (!user) {
            return res.status(404).json({
                error: "User not found",
                success: false
            });
        }
        //update database profile
        if (fullname) {
            user.fullname = fullname;
        }
        if (email) {
            user.email = email;
        }
        if (phoneNumber) {
            user.phoneNumber = phoneNumber;
        }
        if (bio) {
            user.bio = bio;
        }
        if (skills) {
            user.skills = skillsArray;
        }
        if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

       

        await user.save();

 const updateUser = {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile || null,
            skills: user.skills || []
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            user: updateUser,
            success: true
        });
    } catch (error) {
        console.error("Error during profile update:", error);
        res.status(500).json({
            error: "server error profile update failed",
            success: false
        });
    }
}