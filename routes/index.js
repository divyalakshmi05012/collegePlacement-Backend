import {Router} from 'express'
import studentRoutes from './student.js'
import jobRoutes from './jobPosting.js'
import companyRoutes from './company.js'
import adminRoutes from './admin.js'
import applicationRoutes from './application.js'
import academicRoutes from './academic.js'
import interviewRoutes from './interview.js'
import placementRoutes from './placement.js'
const router=Router()

router.get('/',(req,res)=>res.status(200).send(`<h1>college placement backend</h1><p>application is running successfully</p>`))
router.use('/student',studentRoutes)
router.use('/job',jobRoutes)
router.use('/employee',companyRoutes)
router.use('/admin',adminRoutes)
router.use('/application',applicationRoutes)
router.use('/academic',academicRoutes)
router.use('/interview',interviewRoutes)
router.use('/placement',placementRoutes)


export default router