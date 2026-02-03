import mongoose from "mongoose";

const botSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

const Bot = mongoose.models.bot || mongoose.model("Bot", botSchema);
export default Bot;