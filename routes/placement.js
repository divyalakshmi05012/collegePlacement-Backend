import {Router} from 'express'
import placementController from '../controllers/placement.js'
import verifyAdmin from '../middleware/verifyAdmin.js'
const router=Router()


 router.post('/create',verifyAdmin,placementController.createPlacement)
 router.get('/drive',verifyAdmin,placementController.getAllPlacement)

 


 export default router