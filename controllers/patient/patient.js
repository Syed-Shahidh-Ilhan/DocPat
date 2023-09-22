import jwt from "jsonwebtoken"
import Patient from "../../models/Patient.js"
import Doctor from "../../models/Doctor.js"
import bcrypt from "bcrypt"
import Appointment from "../../models/Appointment.js"

export const signup = async (req, res) => {
    const email = req.body.email
    if (await Patient.findOne({ email: email })) {
        return res.json({ status: 0, message: `User with email ${email} already exists` })
    }
    var patient = new Patient(req.body)
    await patient.save()
    res.json({ status: 1, message: "success" })
}

export const login = async (req, res) => {
    const { email, password } = req.body
    const user = await Patient.findOne({ email: email })
    if (!user) {
        return res.json({ status: 0, message: `User with email ${email} does not exists` })
    }
    if (!await bcrypt.compare(password, user.password)) {
        return res.json({ status: 0, message: "Invalid password" })
    }
    const payload = { id: user._id, role: "Patient" }
    const token = jwt.sign(payload, process.env.JWTSECRET)
    res.json({ status: 1, message: "success", authToken: token })
}

export const getDoctors = async (req, res) => {
    const options = req.body
    const doctors = await Doctor.find(options).select({ password: 0, __v: 0 })
    res.json(doctors)
}

export const setAppointment = async (req, res) => {
    var patient = await Patient.findOne({ _id: req.user.id })
    var doctor = await Doctor.findOne({ _id: req.body.docId })
    var booked = await Appointment.find({ doctorId: req.body.docId, time: req.body.time })
    if (booked.length != 0) return res.status(400).json({ message: "bad req" })
    var date = new Date(req.body.time)
    var time = date.getHours()
    if ((time < 9) && (time > 18)) return res.status(400).json({ message: "bad req" })
    var appointment = new Appointment({ patientId: patient._id, doctorId: doctor._id, time: req.body.time })
    appointment.save()
    res.json({ message: "booked" })
}

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