import userModel from "../models/user.js";
import adminModel from "../models/admin.js";
import auth from "../common/auth.js";
import studentModel from "../models/student.js"; 


const adminUser=async(req,res)=>{
    try {
        const { name, email, password,role,adminId} = req.body;
    
        // Hash the password
        const hashedPassword = await auth.hashPassword(req.body.password);
    
        // Create a new company user
        const newAdminUser = new adminModel({
          name,
          email,
          password: hashedPassword,
          role,
          adminId 
          
        });
    
        await newAdminUser.save();
        res.status(201).send({
            message:"admin created Created successfully",
                })
      } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
      }
    
}
const adminUserLogin=async(req,res)=>{
    try {
        const { email, password } = req.body;

        const user = await adminModel.findOne({ email });

        if (!user || !await auth.hashCompare(password, user.password)) {
          return res.status(400).send({
            message:"Invalid credentials"
          })
        }
        let token = await auth.createToken({
            _id: user._id,
            role: user.role
          });
         res.status(200).send({
            message:"Admin User Login Successfull",
                token,
                role:user.role
                })
      } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
      }
}



const getAllAdmin= async (req,res)=>{
    try{
        let admin= await adminModel.find({},{name:1,adminId:1,email:1,password:1,role:1,_id:0})
        res.status(200).send({
            message:"Data Fetch Successfull",
            data:admin
        })
    }catch(error)
    {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
    }
}


export default{
    adminUserLogin,
    adminUser,
    getAllAdmin,
  


}