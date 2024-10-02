import {Router} from 'express'
import studentController from '../controllers/student.js'
import verifyAdmin from '../middleware/verifyAdmin.js'
const router=Router()


 router.post('/register',studentController.register)
 router.post('/login',studentController.login)
 router.get('/getAllStudent',verifyAdmin,studentController.getAllStudent)
 
 


 export default router