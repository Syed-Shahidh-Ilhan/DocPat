import express from 'express';

// importing auth middleware
import auth from '../../middleware/auth/auth.js';

// importing doctor controllers
import { getAllAppointments, getDoctorById, getDoctorsPatient, listAllDoctors, login, signup } from '../../controllers/doctor/doctor.js'

const router = express.Router()

// DOCTOR ROUTES
// authentication - sign up
router.post('/signup', signup);
// login
router.post('/login', login);
// get all appointments
router.get('/appointments', auth, getAllAppointments);
// get doctor's patient 
router.get('/patient/:id', auth, getDoctorsPatient);

// DEVELOPER ENDPOINTS
// list all doctors
router.get('/list', listAllDoctors);
// need to get doctor by id - developer endpoint
router.get('/:id', getDoctorById);

export default router;