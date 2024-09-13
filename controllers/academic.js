import AcademicModel from '../models/academicRecord.js'


const createAcademicRecord= async(req,res)=>{
    try {
        const { studentName, grade, achievements, transcripts } = req.body

        const newAcademicRecord = new AcademicModel({
            studentName,
            grade,
            achievements,
            transcripts
           
        });
    
        await newAcademicRecord.save();
        res.status(201).send({
            message:"AcademicRecord created successfully",
                })
      } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
      }
}

export default{
    createAcademicRecord
}