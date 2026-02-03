import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
    companyname:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    website:{
        type: String,
    },
    location:{
        type: String,
    },
    logo:{
        type: String,
    },
    userId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    }],
},{
    timestamps: true,
});

const Company = mongoose.model('Company', jobSchema);

export default Company;