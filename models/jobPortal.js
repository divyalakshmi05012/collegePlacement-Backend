import mongoose from 'mongoose'
import { validateEmail,validateMobile } from "../common/valdations.js";
import jobPosting from '../controllers/jobPosting.js';

const jobScheema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    jobId:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:[String],
    salary:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    postedDate:{
        type:Date,
        default:Date.now
    }


},
{
    collection:'JobPortal',
    versionKey:false
})

const jobModel = new mongoose.model('JobPortal',jobScheema)

export default jobModel


