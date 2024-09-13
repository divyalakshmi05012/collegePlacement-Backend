import userModel from "../models/user.js";
import companyModel from "../models/company.js";
import auth from "../common/auth.js";

const companyUser=async(req,res)=>{
    try {
        const { name, email, password,role,companyId,companyName} = req.body;
    
        // Hash the password
        const hashedPassword = await auth.hashPassword(req.body.password);
    
        // Create a new company user
        const newCompanyUser = new companyModel({
          name,
          email,
          password: hashedPassword,
          role,
          companyId ,
          companyName
          
        });
    
        await newCompanyUser.save();
        res.status(201).send({
            message:"Company User Created successfully",
                })
      } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error",
            error
        })
      }
    
}
const companyUserLogin=async(req,res)=>{
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

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
            message:"Company User Login Successfull",
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
const getAllCompany= async (req,res)=>{
    try{
        let company= await companyModel.find({},{name:1,companyName:1,companyId:1,email:1,password:1,role:1,_id:0})
        console.log(company)
        res.status(200).send({
            message:"Data Fetch Successfull",
            data:company
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
    companyUser,
    companyUserLogin,
    getAllCompany
}