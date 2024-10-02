import jobModel from '../models/jobPortal.js'


const createJobPosting= async(req,res)=>{
    try {
        const {title, company,jobPostingId, location, description, requirements, salary} = req.body

        const newJobPosting = new jobModel({
           title,
          company,
          jobPostingId,
          location,
          description,
          requirements,
          salary,
        });
    
        await newJobPosting.save();
        res.status(201).send({
            message:"Job posting created successfully",
                })
      } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
            
        })
      }
}
const getJobList = async (req, res) => {
  try {
      
      const jobs = await jobModel.find({});
      
      
      res.status(200).json(jobs);
  } catch (error) {
      
      res.status(500).json({
          message: error.message || 'Internal Server Error',
          error
      });
  }
};





export default{
    createJobPosting,
    getJobList
   
}