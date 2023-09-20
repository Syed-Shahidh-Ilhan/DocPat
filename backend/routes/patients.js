import express from 'express';
import { getPatientAppointments } from '../controllers/patients.js'

const router = express.Router();

router.get('/appointments/:id', getPatientAppointments);

router.post('/patient',async (req,res)=>{
    const patientName = req.body.name
    var patient = new Patient()
    patient.name = patientName
    await patient.save()
    res.send("successfully created")
})

router.get('/patients',async (req,res)=>{
    var patients = await Patient.find({})
    res.send(patients)
})

export default router;