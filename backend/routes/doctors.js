import express from 'express';
import { getDoctorAppointments } from '../controllers/doctors.js'

const router = express.Router();

router.route('/appointments/:id').get(getDoctorAppointments);

export default router;