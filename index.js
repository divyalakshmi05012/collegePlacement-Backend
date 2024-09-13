import express from 'express'
// import { config as configDotenv } from "dotenv";
import dotenv from 'dotenv'
import cors from 'cors'
import Router from './routes/index.js'
import connectDB from './models/index.js';


dotenv.config()
// const PORT=process.env.PORT
// const app=express()

// app.use(cors())
// app.use(express.json())
// app.use(Router)

const app=express()
// app.listen(PORT,()=>console.log(`Server Running at Port ${PORT}`))
const PORT=process.env.PORT
app.use(cors())
app.use(express.json())
app.use(Router)

app.listen(PORT,async()=>{
    try{
        await connectDB();
        console.log(`server running on port ${PORT}..`)
        console.log("connected to the database")
    }catch(error){
        console.log("Failed to connect to the database;",error);
        process.exit(1);
    }
})