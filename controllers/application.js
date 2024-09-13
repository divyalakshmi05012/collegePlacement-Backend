import applicationModel from '../models/application.js'
import path from 'path';

const createApplication = async (req, res) => {
  try {
      const { applicationId, studentId, studentName,jobId, status } = req.body;

      // Extract file paths from uploaded files
      const resume = req.files['resume'] ? req.files['resume'][0].path : null;
      const coverLetter = req.files['coverLetter'] ? req.files['coverLetter'][0].path : null;

      // Validate required fields
      if (!studentId || !studentName || !jobId || !resume) {
          return res.status(400).send({
              message: 'Missing required fields: studentId, studentName, jobId, and resume are mandatory.',
          });
      }

      // Check for existing application
      const existingApplication = await applicationModel.findOne({ studentId, jobId });
      if (existingApplication) {
          return res.status(409).send({
              message: 'Application already exists for this job posting',
          });
      }

      // Create new application
      const newApplication = new applicationModel({
        applicationId,
          studentId,
          studentName,
          jobId,
          resume,
          coverLetter,
          status: status || 'pending', // Default to 'pending' if status is not provided
      });

      // Save the application to the database
      await newApplication.save();

      return res.status(201).send({
          message: "Application created successfully",
          data: newApplication
      });
  } catch (error) {
      return res.status(500).send({
          message: error.message || "Internal Server Error",
          error
      });
  }
};

const getApplicationById= async(req,res)=>{
    try {
        const { studentId } = req.params;
        console.log('Received studentId:', studentId); 
        const application = await applicationModel.findOne({studentId})
          .populate('jobPostingId')  
          .exec();
    console.log(application)
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
            .populate('jobPostingId')  
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

const updateStatus=async (req, res) => {

  try {
    const { applicationId } = req.params;
    const { status } = req.body;
    const updatedApplication = await applicationModel.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.status(200).json({ success: true, application: updatedApplication });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export default{
    createApplication,
    getApplicationById,
    getAllApplications,
    updateStatus
}