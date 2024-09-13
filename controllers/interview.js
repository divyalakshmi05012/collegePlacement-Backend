import interviewModel from "../models/interview.js";
import userModel from "../models/user.js";
import nodemailer from 'nodemailer'
import 'dotenv/config'
import studentModel from "../models/student.js";

async function sendNotification(email, message) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.PASSWORD
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: process.env.EMAIL_ID,
      subject: 'Interview Notification',
      text: message,
    };
  
    await transporter.sendMail(mailOptions);
  }

  const interviewSchedule = async (req, res) => {
    try {
        const { studentId, studentName, companyName, companyId, date, mode, status } = req.body;

        const newInterview = new interviewModel({
            studentId,
            studentName,
            companyName,
            companyId,
            date,
            mode,
            status
        });

        await newInterview.save();

        const student = await studentModel.findOne({ studentId });
        if (!student) {
            return res.status(404).send({ message: 'Student not found' });
        }

        await sendNotification(student.email, 'Hi, Your interview has been scheduled for Tomorrow at 10 AM.');

        res.status(201).send({
            message: 'Interview scheduled and notification sent successfully'
        });
    } catch (error) {
        console.error('Error scheduling interview:', error);
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        });
    }
};

const getAllInterviews = async (req, res) => {
  try {
    // Retrieve all interviews from the database
    const interviews = await interviewModel.find()
      .populate('studentId') // Populate student details
      .populate('companyId') // Populate company details
      .exec();

    // Send back the list of interviews
    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error", error });
  }
};


const getInterviewById= async(req,res)=>{
    try {
        console.log(req.params.studentId )
        const interviews = await interviewModel.find({ studentId: req.params.studentId })
          .populate('companyId')
          .exec();
    
        res.status(200).json(interviews);
      } catch (error) {
        res.status(500).json({ error });
      }
}

export default{
    interviewSchedule,
    getInterviewById,
    getAllInterviews
}