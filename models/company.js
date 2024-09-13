import mongoose from 'mongoose'
import userModel from './user.js'

const companyScheema = new mongoose.Schema({
    companyId:{
        type: String,
        required: true,
        unique: true
   },
    contactInfo:[{
         phone:{ 
            type:Number,
             required: true 
            },
         email:{
            type: String,
            required: true 
           }
  }],
},
{
    collection:'Company',
    versionKey:false
})

const companyModel = userModel.discriminator('Company',companyScheema)

export default companyModel