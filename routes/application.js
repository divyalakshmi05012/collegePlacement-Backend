import {Router} from 'express'
import applicationController from '../controllers/application.js'
import verifyAdmin from '../middleware/verifyAdmin.js'
import verify from '../middleware/verify.js'
import upload from '../middleware/multerConfig.js'
const router=Router()


 router.post('/apply' ,upload.fields([{ name: 'resume' }, { name: 'coverLetter' }]),applicationController.createApplication)
 router.get('/getApplication/:studentId',verify,applicationController.getApplicationById)
 router.get('/getAllApplication',applicationController.getAllApplications)
 router.get('/companyApplication',applicationController.getApplicationsByCompany)


 export default router