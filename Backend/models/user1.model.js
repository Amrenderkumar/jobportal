import mongoose from 'mongoose';

const user1Schema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true, 
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['Student','Recruiter'],
        default:'Student',
        required:true
    },
    profile:{
        bio:{
            type:String,
        },
        skills:[{
            type:String,
        }],
        resume:{
            type:String,  //user to resume
        },
        resumeOriginalName:{
            type:String,
        },
        company:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Company'
        },profileImage:{
            type:String,
        }
    },
},{
    timestamps:true
});

const user1 = mongoose.model('User1', user1Schema);

export default user1;