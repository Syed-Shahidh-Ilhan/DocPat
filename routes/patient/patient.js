import express from "express"

const router = express.Router()

// importing auth middleware
import auth,{validDoctor} from "../../middleware/auth/auth.js"

// importing patient controllers
import { 
    appointments, 
    getDoctors, 
    listAllPatients, 
    login, 
    patientDetails,  
    signup,
    getDoctor
 } from "../../controllers/patient/patient.js"

 import { getDoctorAppointments,createAppointment, getPatientAppointments } from "../../controllers/appointment/appointment.js"

//public Endoints

// no auth token after signup?
// changed it to signup
router.post('/signup', signup);

router.post('/login', login);

router.post('/getDoctors', auth, getDoctors);

router.post('/getDoctor',auth,validDoctor,getDoctor);

router.post('/getDoctorAppointments',auth,getDoctorAppointments);

router.post('/setAppointment', auth, createAppointment);

router.post('/getPatientAppointments',auth,getPatientAppointments);

//Temp Dev Endpoints
router.get('/list', listAllPatients);

router.get('/details', auth, patientDetails);

router.get('/appointments', appointments);

export default router;