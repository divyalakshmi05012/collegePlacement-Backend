import mongoose from 'mongoose'

const interviewSchema = new mongoose.Schema({
    studentId:{
        type:String,
        required:true
    },
    companyName:{
      type:String,
      required:true
    },
    companyId:{
        type: String,
        required:true
    },
    date:{
     type: Date,
     required: true 
    },
    mode:{ 
      type: String,
      enum:['in-person', 'virtual'], 
      required: true },
    status:{
      type: String, 
      enum: ['scheduled', 'completed', 'canceled'], 
      default: 'scheduled'
    },
    feedback:{
      type: String 
    },
    notificationSent:{ 
        type: Boolean,
         default: true
    },
    reminderSent:{ 
        type: Boolean,
         default: true
    },
  },
  {
    
        collection:'Interview',
        versionKey:false
  });
  
  const interviewModel =new mongoose.model ('Interview', interviewSchema);

  export default interviewModel
  