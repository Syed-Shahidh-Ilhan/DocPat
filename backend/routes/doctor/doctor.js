import express from 'express';
import Doctor from "../../models/Doctor.js"
import Appointment from "../../models/Appointment.js"
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;
// getting all the appointments for a doctor
const router = express.Router()
// Define the route to get all appointments for a specific doctor
router.get('/appointments/:id', async (req, res) => {
    const doctorID = req.params.id;
  
    // Check if the doctorID is valid (you might want to do this check)
    if (!ObjectId.isValid(doctorID)) {
      return res.status(400).json({ error: 'Invalid doctorID' });
    }
  
    try {
      // Query the Appointment collection to find all appointments for the specified doctor
      const appointments = await Appointment.find({ doctorId: doctorID });
  
      // Send the appointments as a JSON response
      res.json(appointments);
    } catch (error) {
      // Handle any errors that occur during the database query
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
// list all doctors
router.get('/list',async (req,res)=>{
    var doctors = await Doctor.find({})
    console.log(doctors)
    res.send(doctors)
    // res.send("great success")
})

// need to get doctor by id
router.get('/:id',async(req,res)=>{
    const doctorId = req.params.id;

    // Perform a database query or any other action to retrieve the doctor by ID
    // Replace the following line with your actual database retrieval logic
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // If the doctor is found, send it as a JSON response
    res.json(doctor);

})

// create a doctor
router.post('/create',async (req,res)=>{

    await Doctor.create(req.body)
    res.send("successfully created")
})


export default router;
