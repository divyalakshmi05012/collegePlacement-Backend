import mongoose from 'mongoose'
import userModel from './user.js';

const adminSchema = new mongoose.Schema({
   adminId:{
    type:String,
    required:true,
    unique: true
   }
}, {
    collection: 'Admin',
    versionKey: false
});


const adminModel = userModel.discriminator('Admin', adminSchema);

export default adminModel;
