import express from 'express';

// importing auth middleware
import auth from '../../middleware/auth/auth.js';

// importing doctor controllers
import { getAllAppointments, getDoctorById, getDoctorsPatient, listAllDoctors, login, signup } from '../../controllers/doctor/doctor.js'
import {getDoctorAppointments,deleteAppointment} from '../../controllers/appointment/appointment.js'


const router = express.Router()

// DOCTOR ROUTES
// authentication - sign up
router.post('/signup', signup);
// login
router.post('/login', login);
// get all appointments (this is useless now because we have get doctor's patients below)
router.get('/appointments', auth, getAllAppointments);
// get doctor's patient 
router.get('/patient/:id', auth, getDoctorsPatient);

// get doctor's patients
router.get('/patients',auth,getDoctorAppointments)

// delete doctor appointments

router.delete('/deleteAppointments',auth,deleteAppointment)


// DEVELOPER ENDPOINTS
// list all doctors
router.get('/list', listAllDoctors);
// need to get doctor by id - developer endpoint
router.get('/:id', getDoctorById);

export default router;