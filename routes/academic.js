import {Router} from 'express'
import academicController from '../controllers/academic.js'
const router=Router()


 router.post('/create',academicController.createAcademicRecord)

 


 export default router