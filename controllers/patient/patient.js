import jwt from "jsonwebtoken"
import Patient from "../../models/Patient.js"
import Doctor from "../../models/Doctor.js"
import bcrypt from "bcrypt"
import Appointment from "../../models/Appointment.js"

export const signup = async (req, res) => {
    try{
    const email = req.body.email
    //checking if User already exists
    if (await Patient.findOne({ email: email })) {
        return res.status(400).json({message: `User with email ${email} already exists` })
    }
    var patient = new Patient(req.body)
    await patient.save()
    res.json({message: "success" })}
    catch(error){
        //invalid req.body 
        res.status(500).send(error)
    }
}

export const login = async (req, res) => {
    try{
    const { email, password } = req.body
    const patient = await Patient.findOne({ email: email })
    //checking if User exists
    if (!patient) {
        return res.status(400).json({message: `User with email ${email} does not exists`})
    }
    //checking whether password matches
    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).json({message: "Invalid password" })
    }
    const payload = { id: patient._id, role: "Patient" }
    //generating auth token
    const token = jwt.sign(payload, process.env.JWTSECRET)
    res.json({message: "success", authToken: token,name:patient.name})}
    catch(error){
        //invalid req.body 
        res.status(500).send(error)
    }
}

export const getDoctors = async (req, res) => {
    try{
    const options = req.body.filter //expecting valid filter options in request body
    const doctors = await Doctor.find(options).select({ password: 0, __v: 0 })//excluding password and version fields
    res.json(doctors)}
    catch(error){
        //invalid filter options
        res.status(500).send(error)
    }
}
export const getDoctor = async (req,res)=>{
    //try catch needed here ?
    try{
    var doctor = res.locals.doctor //doctor object passed from validDoctor middleware
    res.send(doctor)}
    catch(error){
        res.status(500).send(error)
    }
}
export const rateDoctor = async (req,res)=>{
    try{
        var doctor = res.locals.doctor
        var newRating = parseInt(req.body.rating)
        if(newRating<0 || newRating>5)newRating = 0
        const patientsRated = doctor.patientsRated||0
        const rating = doctor.rating||0
        const currentRating = (rating*patientsRated+newRating)/(patientsRated+1)
        doctor.rating = currentRating
        doctor.patientsRated = patientsRated+1
        doctor.save()
        res.json({message:"success"})
    }
    catch(error){
        res.status(500).send(error)
    }
}

//Temp Dev  -- ignore 
export const listAllPatients = async (req, res) => {
    var patients = await Patient.find({})
    res.json(patients)
}

export const patientDetails = async (req, res) => {
    var patient = await Patient.findOne({ '_id': req.user.id })
    res.json(patient)
}

export const appointments = async (req, res) => {
    var appointments = await Appointment.find({})
    res.json(appointments)
}