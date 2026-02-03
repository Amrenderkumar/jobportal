import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
import Userrouter from './routes/user.route.js'
import cookieParser from 'cookie-parser';
import Companyrouter from './routes/company.route.js';
import jobroute from './routes/job.route.js'
import applicationroute from './routes/application.route.js'


import chatbotRoutes from './routes/chatbot.route.js'

const app = express();
dotenv.config()

const port =process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());
//Database connection code
const connectDB = async () => {
    try {
     const connectionInstance =  await mongoose.connect(`${process.env.MONGO_DB}`);
     console.log(`\n Mongodb is connected !!  DB Host: ${connectionInstance.connection.host}`);
     
    } catch (error) {
        console.log('Mongodb is Error !!', error);
        process.exit(1);
    }
}

app.get('/', (req,res) => {
    try {
        res.send("App is connected");
    } catch (error) {
        console.log("Express is not connected", error);
    }
})

app.use("/bot/v1/", chatbotRoutes);

app.use("/api/users", Userrouter);
app.use("/api/company", Companyrouter);
app.use("/api/job", jobroute);
app.use("/api/application", applicationroute);

app.listen(port, () =>{
    console.log(`App listen to port ${port}`);
})


export default connectDB();