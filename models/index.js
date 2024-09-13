import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();


const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
    }catch(err){
        console.log("Error  connecting to mongoDB:", err)
        process.exit(1)
    }
}

export default connectDB