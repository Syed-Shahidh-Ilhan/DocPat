import express from "express"
const router = express.Router()
import doctorRoutes from "./patient/doctors.js"
import patientRoutes from "./patient/patients.js"
import appointmentRoutes from "./patient/appointments.js"
router.use('/doctor',doctorRoutes)
router.use('/patient',patientRoutes)
router.use('/appointment',appointmentRoutes)
export default router