import express from 'express';
import Doctor from '../../models/Doctor.js';

const router = express.Router();


router.post('/createDoctor',async (req,res)=>{
    const doctorName = req.body.name
    var doctor = new Doctor()
    doctor.name = doctorName
    await doctor.save()
    res.send(doctor)
})
router.get('/listDoctors',async (req,res)=>{
    var doctors = await Doctor.find({})
    res.send(doctors)
})

export default router;