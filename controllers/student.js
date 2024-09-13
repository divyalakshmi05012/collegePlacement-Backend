import studentModel from "../models/student.js";
import userModel from "../models/user.js";
import multer from 'multer';
import auth from "../common/auth.js";


const register=async(req,res)=>{
    try {
        const { name, email, password,role, studentId ,course} = req.body;
    
        // Hash the password
        const hashedPassword = await auth.hashPassword(req.body.password);
    
        // Create a new student
        const newStudent = new studentModel({
          name,
          email,
          password: hashedPassword,
          role,
          studentId ,
          // Ensure studentId is captured during registration
          course
        });
    
        // Save the student to the database
        await newStudent.save();
        res.status(201).send({
            message:"student registered successfully",
                })
      } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
      }
    
}
const login = async(req,res)=>{
    try {
        let user = await userModel.findOne({email:req.body.email});
        if(user)
        {
            //validate pwd
            if(await auth.hashCompare(req.body.password,user.password))
            {
                let payload = {
                    _id:user._id,
                    Name:user.name,
                    email:user.email,
                    role:user.role,
                    studentId:user.studentId
                }
                let token = await auth.createToken(payload)
                res.status(200).send({
                    message:"Login Successfull",
                    token,
                    role:user.role,
                    studentId:user.studentId
                })
            }
            else
            {
                res.status(400).send({
                    message:"Incorrect Password"
                })
            }

        }
        else
        {
            res.status(400).send({
                message:`User does not exists`
            })
        }
       
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}


const getAllStudent= async (req,res)=>{
    try{
        let student= await studentModel.find({},{name:1,studentId:1,email:1,password:1,mobile:1,role:1,_id:0})
        res.status(200).send({
            message:"Data Fetch Successfull",
            data:student
        })
    }catch(error)
    {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}

export default {
   register,
   login,
   getAllStudent
}