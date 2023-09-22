import express from "express"

const router = express.Router()

// importing auth middleware
import auth from "../../middleware/auth/auth.js"

// importing patient controllers
import { appointments, getDoctors, listAllPatients, login, patientDetails, setAppointment, signup } from "../../controllers/patient/patient.js"

//public Endoints

// no auth token after signup?
// changed it to signup
router.post('/signup', signup);

router.post('/login', login);

router.post('/getDoctors', auth, getDoctors);

router.post('/setAppointment', auth, setAppointment);


//Temp Dev Endpoints
router.get('/list', listAllPatients);

router.get('/details', auth, patientDetails);

router.get('/appointments', appointments);

export default router;