import mongoose from 'mongoose'

const academicRecordSchema = new mongoose.Schema({
    studentName:{
        // type:mongoose.Schema.Types.ObjectId,
        // ref:'Students'
        type:String,
        required:true
    },
    grade:{
        type:String,
        required:true
    },
    achievements: [String],
     transcripts: [String] 
    

},
{
    collection:'AcademicRecord',
    versionKey:false
})

const academicRecordModel = new mongoose.model('AcademicRecord', academicRecordSchema);

export default academicRecordModel