import {Router} from 'express'
import jobPostingController from '../controllers/jobPosting.js'
import verify from '../middleware/verify.js'
import verifyAdmin from '../middleware/verifyAdmin.js'
const router=Router()


 router.post('/createjob',jobPostingController.createJobPosting)
 router.get('/getJobList',jobPostingController.getJobList)

 


 export default router