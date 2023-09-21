import express from 'express';
import Patient from '../../models/Patient.js'

const router = express.Router();


router.post('/createPatient',async (req,res)=>{
    const patientName = req.body.name
    var patient = new Patient()
    patient.name = patientName
    await patient.save()
    res.send("successfully created")
})

router.get('/listPatients',async (req,res)=>{
    var patients = await Patient.find({})
    res.send(patients)
})

export default router;