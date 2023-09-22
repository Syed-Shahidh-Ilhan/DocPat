import express from 'express';
import Doctor from "../../models/Doctor.js"
import Appointment from "../../models/Appointment.js"
import mongoose from 'mongoose';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Patient from '../../models/Patient.js';

const { ObjectId } = mongoose.Types;
// getting all the appointments for a doctor
const router = express.Router()
// Define the route to get all appointments for a specific doctor




// authorization 

function auth(req,res,next){
    const token = req.headers.authorization
    // console.log(token.split(" ")[1])
    try{
    const {id,role} = jwt.verify(token.split(" ")[1],process.env.JWTSECRET)
    req.user = {}
    req.user.id = id
    req.user.role = role
    next()}
    catch{
        res.json({status:0,message:"unauthorized"})
    }
}

// authentication - sign up
router.post('/signup',async(req,res)=>{
    const email = req.body.email
    if(await Doctor.findOne({email})){
        return res.json({status:0,message:`Doctor with email ${email} already exists`})
    }
    let doctor = new Doctor(req.body)
    await doctor.save()
    res.json({status:1,message:"success"})
})



// login
router.post('/login',async(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    let doctor = await Doctor.findOne({email})
    if(!doctor){
        return res.json({status:0,message:`Doctor with email ${email} does not exist`})
    }
    if(!(await bcrypt.compare(password,doctor.password))){
        return res.json({status:0,message:`Invalid password`})
    }
    const token = jwt.sign({id:doctor._id,role:"Doctor"},process.env.JWTSECRET)
    res.json({status:1,message :"success",authToken:token})
})

//logout
router.get('/logout',async(req,res)=>{

})

// get all appointments
router.get('/', auth, async (req, res) => {
    const doctorID = req.user.id 
    console.log(doctorID)
    
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

// get doctor's patient 

router.get('/patient/:id',auth,async(req,res)=>{
    const patientID = req.params.id
    const patient = await Patient.findById(patientID);

    if (!patient) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // If the doctor is found, send it as a JSON response
    res.json(patient);


})



  
// list all doctors
router.get('/list',async (req,res)=>{
    var doctors = await Doctor.find({})
    console.log(doctors)
    res.send(doctors)
    // res.send("great success")
})


// need to get doctor by id - developer endpoint
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


export default router;
