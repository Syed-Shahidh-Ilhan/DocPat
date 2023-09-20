import express from 'express';
import { getDoctorAppointments } from '../controllers/doctors.js'

const router = express.Router();

router.route('/appointments/:id').get(getDoctorAppointments);

router.post('/doctor',async (req,res)=>{
    const doctorName = req.body.name
    var doctor = new Doctor()
    doctor.name = doctorName
    await doctor.save()
    res.send("successfully created")
})
router.get('/doctors',async (req,res)=>{
    var doctors = await Doctor.find({})
    res.send(doctors)
})
  
export default router;