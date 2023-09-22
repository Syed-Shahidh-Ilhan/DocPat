import jwt from "jsonwebtoken"
import Patient from "../../models/Patient.js"
import Doctor from "../../models/Doctor.js"
import bcrypt from "bcrypt"
import Appointment from "../../models/Appointment.js"

export const signup = async (req, res) => {
    try{
    const email = req.body.email
    if (await Patient.findOne({ email: email })) {
        return res.status(400).json({message: `User with email ${email} already exists` })
    }
    var patient = new Patient(req.body)
    await patient.save()
    res.json({message: "success" })}
    catch(error){
        res.status(500).send(error)
    }
}

export const login = async (req, res) => {
    try{
    const { email, password } = req.body
    const user = await Patient.findOne({ email: email })
    if (!user) {
        return res.status(400).json({message: `User with email ${email} does not exists`})
    }
    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).json({message: "Invalid password" })
    }
    const payload = { id: user._id, role: "Patient" }
    const token = jwt.sign(payload, process.env.JWTSECRET)
    res.json({message: "success", authToken: token })}
    catch(error){
        res.status(500).send(error)
    }
}

export const getDoctors = async (req, res) => {
    try{
    const options = req.body
    const doctors = await Doctor.find(options).select({ password: 0, __v: 0 })
    res.json(doctors)}
    catch(error){
        res.status(500).send(error)
    }
}
export const getDoctor = async (req,res)=>{
    try{
    var doctor = res.locals.doctor
    res.send(doctor)}
    catch(error){
        res.status(500).send(error)
    }
}

//Temp Dev 
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