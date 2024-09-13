import {Router} from 'express'
import adminController from '../controllers/admin.js'
import verifyAdmin from '../middleware/verifyAdmin.js'
const router=Router()


 router.post('/create-admin',adminController.adminUser)
 router.post('/login-admin',adminController.adminUserLogin)
 router.get('/getAllAdmin',verifyAdmin,adminController.getAllAdmin)
 


 export default router