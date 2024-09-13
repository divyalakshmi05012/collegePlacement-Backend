import {Router} from 'express'
import companyController from '../controllers/company.js'
import verifyAdmin from '../middleware/verifyAdmin.js'
const router=Router()


 router.post('/create-employee',companyController.companyUser)
 router.post('/login-employee',companyController.companyUserLogin)
 router.get('/getAllCompany',verifyAdmin,companyController.getAllCompany)
 


 export default router