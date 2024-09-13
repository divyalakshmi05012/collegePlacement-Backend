import {Router} from 'express'
import interviewController from '../controllers/interview.js'
import verifyAdmin from '../middleware/verifyAdmin.js'
import verify from '../middleware/verify.js'
const router=Router()


 router.post('/schedule',interviewController.interviewSchedule)
 router.get('/getPlacement/:studentId',verify,interviewController.getInterviewById)
 router.get('/getAllInterview',interviewController.getAllInterviews)

 


 export default router