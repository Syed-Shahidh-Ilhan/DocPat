import express from 'express';
import Appointment from "../models/Appointment.js"
import mongoose from 'mongoose';
import Patient from '../models/Patient.js';
const { ObjectId } = mongoose.Types;
const router = express.Router();



router.post('/create',async (req,res)=>{
    const { doctorID, patientID } = req.body;
    if (!ObjectId.isValid(doctorID)) {
      return res.status(400).json({ error: 'Invalid doctorID' });
    }
  
    if (!ObjectId.isValid(patientID)) {
      return res.status(400).json({ error: 'Invalid doctorID' });
    }
  
  
    // Check if the doctorID exists in the Doctor collection
    const doctor = await Doctor.findById(doctorID);
    console.log(doctor)
    if (!doctor) {
      return res.status(400).json({ error: 'Invalid doctorID' });
    }
  
    // // Check if the patientID exists in the Patient collection
    const patient = await Patient.findById(patientID);
    if (!patient) {
      return res.status(400).json({ error: 'Invalid patientID' });
    }
  
    // Both doctorID and patientID are valid; create the appointment
    const appointment = new Appointment({
      doctorId: doctor._id,
      patientId: patient._id,
      time: new Date(),
    });
  
    await appointment.save();
    res.send(appointment);
})

router.get('/list',async (req,res)=>{
    var appointments = await Appointment.find({})
    res.send(appointments)
})  

export default router