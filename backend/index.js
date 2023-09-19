import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import './db/mongoose.js'
import cors from 'cors';
//mongo models imports
import Patient from "./models/Patient.js"
import Doctor from "./models/Doctor.js"
import Appointment from "./models/Appointment.js"
//route imports
import doctorRoutes from './routes/doctors.js';
import patientRoutes from './routes/patients.js';

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
app.post('/createPatient',async (req,res)=>{
  const patientName = req.body.name
  var patient = new Patient()
  patient.name = patientName
  await patient.save()
  res.send("successfully created")
})
app.get('/listPatients',async (req,res)=>{
  var patients = await Patient.find({})
  res.send(patients)
})
app.post('/createDoctor',async (req,res)=>{
  const doctorName = req.body.name
  var doctor = new Doctor()
  doctor.name = doctorName
  await doctor.save()
  res.send("successfully created")
})
app.get('/listDoctors',async (req,res)=>{
  var doctors = await Doctor.find({})
  res.send(doctors)
})
app.post('/createAppointment',async (req,res)=>{
  var appointment = new Appointment()
  appointment.doctorID = req.body.doctor
  appointment.patientID = req.body.patient
  console.log(appointment)
  await appointment.save()
  res.send("successfully created")
})
app.get('/listAppointments',async (req,res)=>{
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
