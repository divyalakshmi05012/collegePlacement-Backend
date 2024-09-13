import mongoose from 'mongoose'
import userModel from './user.js'

const studentSchema = new mongoose.Schema({
    studentId:{
      type: String,  
      required: true,
      unique: true
    },
    course:{
        type:String,
        required:true
    },
    name:{ 
      type: String,
       required: true 
    },
    email:{ 
      type: String, 
      required: true 
    },
    resume:{ 
      type: String 
    }, 
    coverLetter:{
       type: String 
    } ,
      applicationId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
      }],
      jobPostingId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobPortal'
      }]

},
{
    collection:'Students'
    
})

const studentModel = userModel.discriminator('Students', studentSchema);

export default studentModel