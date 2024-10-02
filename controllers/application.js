import applicationModel from '../models/application.js'
import jobModel from '../models/jobPortal.js'


const createApplication = async (req, res) => {
  try {
    const { applicationId, studentId, studentName, jobPostingId } = req.body;

    const resume = req.files['resume'] ? req.files['resume'][0].path : null;
    const coverLetter = req.files['coverLetter'] ? req.files['coverLetter'][0].path : null;

    if (!studentId || !studentName || !jobPostingId || !resume) {
      return res.status(400).send({
        message: 'Missing required fields: studentId, studentName, jobPostingId, and resume are mandatory.',
      });
    }

    // Check if the application already exists
    const existingApplication = await applicationModel.findOne({ studentId, jobPostingId });
    if (existingApplication) {
      return res.status(409).send({
        message: 'Application already exists for this job posting',
      });
    }

    // Find the JobPortal by jobPostingId to get the jobPostId
    const jobPortal = await jobModel.findOne({ jobPostingId });
    if (!jobPortal) {
      return res.status(404).send({
        message: 'Job posting not found',
      });
    }

    // Create new application with jobPostId
    const newApplication = new applicationModel({
      applicationId,
      studentId,
      studentName,
      jobPostingId,
      jobPostId: jobPortal._id,  // Add jobPostId
      resume,
      coverLetter,
    });

    await newApplication.save();

    return res.status(201).send({
      message: "Application created successfully",
      data: newApplication,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Internal Server Error",
      error,
    });
  }
};


const getApplicationById= async(req,res)=>{
    try {
        const { studentId } = req.params;
        const application = await applicationModel.findOne({studentId})
          .populate('jobPostId')  
          .exec();
        if (!application) {
          return res.status(404).send({
            message: 'Application not found',
          });
        }
    
        // Send the application data
        res.status(200).json({
          message: 'Application retrieved successfully',
          data: application,
         
        });
      } catch (error) {
        res.status(500).send({
          message: error.message || 'Internal Server Error',
          error,
        });
      }}


const getAllApplications = async (req, res) => {
        try {
          const applications = await applicationModel.find({})
            .populate('jobPostId')  
            .exec();
          if (!applications || applications.length === 0) {
            return res.status(404).send({
              message: 'No applications found',
            });
          }
      
          res.status(200).json({
            message: 'Applications retrieved successfully',
            data: applications,
          });
        } catch (error) {
          res.status(500).send({
            message: error.message || 'Internal Server Error',
            error,
          });
        }
      };
  
const getApplicationsByCompany = async (req, res) => {
        try {
          const applications = await applicationModel.find({})
            .populate('jobPostId')  
            .exec();
          if (!applications || applications.length === 0) {
            return res.status(404).send({
              message: 'No applications found',
            });
          }
      
          res.status(200).json({
            message: 'Applications retrieved successfully',
            data: applications,
          });
        } catch (error) {
          res.status(500).send({
            message: error.message || 'Internal Server Error',
            error,
          });
        }
      };


export default{
    createApplication,
    getApplicationById,
    getAllApplications,
    getApplicationsByCompany
}