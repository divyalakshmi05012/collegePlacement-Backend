import mongoose from 'mongoose'

 
const applicationSchema = new mongoose.Schema({
    applicationId:{
        type:String,
        required:true
    },
    studentId:{
       type:String,
        required:true
    },
    studentName:{
        type: String,
        required:true
    },
    jobPostingId:{
        type:String,
        required:true
    },
    jobPostId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobPortal',
 },
    resume:{
         type: String,
         required: true 
    },  
    coverLetter:{
         type: String 
    },
    appliedDate:{ 
        type: Date, 
        default: Date.now 
    }
},
{
    collection:'Application',
    versionKey:false
})

const applicationModel = new mongoose.model('Application', applicationSchema);

export default applicationModel

