import mongoose from 'mongoose'
import { validateEmail,validateMobile } from "../common/valdations.js";

const userScheema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        validate:{
            validator: validateEmail,
            message: props => `${props.value} is not a valid email!`
        }
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    role:{
        type:String,
        enum: {
            values: ['Student', 'Admin','Company'],
            message: '{VALUE} is not supported'
          }
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

},
{
    collection:'users',
    versionKey:false
})

const userModel = new mongoose.model('users',userScheema)

export default userModel