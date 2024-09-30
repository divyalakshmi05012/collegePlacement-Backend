import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    jobPostingId:{
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

const jobModel = new mongoose.model('JobPortal',jobSchema)

export default jobModel


