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
    jobPostingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobPortal',
        required: true
    },
    resume:{
         type: String,
         required: true 
    },  
    coverLetter:{
         type: String 
    },
    status:{
        type:String,
        enum: {
            values: ['submitted', 'reviewed', 'shortlisted', 'rejected', 'accepted'],
            default: 'submitted',
            message: '{VALUE} is not supported'
          }
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

