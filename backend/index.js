import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose';
import './db/mongoose.js'
import cors from 'cors';
//mongo models imports
import Patient from "./models/Patient.js"
import Doctor from "./models/Doctor.js"
import Appointment from "./models/Appointment.js"
//route imports
import doctorRoutes from './routes/doctors.js';
import patientRoutes from './routes/patients.js';
const { ObjectId } = mongoose.Types;


const app = express();
const port = process.env.PORT || 3000; // You can change the port number as needed

// Middleware to handle CORS (Cross-Origin Resource Sharing)
app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());

// Define a sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
// app.post('/patient',async (req,res)=>{
//   const patientName = req.body.name
//   var patient = new Patient()
//   patient.name = patientName
//   await patient.save()
//   res.send("successfully created")
// })
// app.get('/patients',async (req,res)=>{
//   var patients = await Patient.find({})
//   res.send(patients)
// })
// app.post('/doctor',async (req,res)=>{
//   const doctorName = req.body.name
//   var doctor = new Doctor()
//   doctor.name = doctorName
//   await doctor.save()
//   res.send("successfully created")
// })
// app.get('/doctors',async (req,res)=>{
//   var doctors = await Doctor.find({})
//   res.send(doctors)
// })
app.post('/appointment',async (req,res)=>{
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
app.get('/appointments',async (req,res)=>{
  // res.send("all good")
  var appointments = await Appointment.find({})
  res.send(appointments)
})
// Doctor Routes
app.use('/doctor', doctorRoutes);

// Patient Routes
app.use('/patient', patientRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
