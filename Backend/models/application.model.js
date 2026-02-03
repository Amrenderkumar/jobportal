import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema({
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required: true,
    },
    applicants:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    status:{
        type: String,
        enum: ['applied', 'reviewed', 'pending', 'offered', 'rejected'],
        default: 'applied',
    },
},{timestamps: true});

const Application = mongoose.model('Application', applicationSchema);
export default Application;