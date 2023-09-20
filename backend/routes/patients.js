import express from 'express';
import { getPatientAppointments } from '../controllers/patients.js'

const router = express.Router();

router.get('/appointments/:id', getPatientAppointments);

export default router;