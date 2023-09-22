import Doctor from "../../models/Doctor.js"
import Appointment from "../../models/Appointment.js"
import mongoose from 'mongoose';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Patient from '../../models/Patient.js';

const { ObjectId } = mongoose.Types;

export const signup = async (req, res) => {
    const email = req.body.email
    if (await Doctor.findOne({ email })) {
        return res.json({ status: 0, message: `Doctor with email ${email} already exists` })
    }
    let doctor = new Doctor(req.body)
    await doctor.save()
    res.json({ status: 1, message: "success" })
}

export const login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    let doctor = await Doctor.findOne({ email })
    console.log(doctor)
    if (!doctor) {
        return res.json({ status: 0, message: `Doctor with email ${email} does not exist` })
    }
    if (!(await bcrypt.compare(password, doctor.password))) {
        return res.json({ status: 0, message: `Invalid password` })
    }
    const token = jwt.sign({ id: doctor._id, role: "Doctor" }, process.env.JWTSECRET)
    res.json({ status: 1, message: "success", authToken: token })
}

export const getAllAppointments = async (req, res) => {
    const doctorID = req.user.id
    console.log(doctorID)

    // check if the doctorID is valid (you might want to do this check)
    if (!ObjectId.isValid(doctorID)) {
        return res.status(400).json({ error: 'Invalid doctorID' });
    }

    try {
        // query the Appointment collection to find all appointments for the specified doctor
        const appointments = await Appointment.find({ doctorId: doctorID });
        // send the appointments as a JSON response
        res.json(appointments);
    } catch (error) {
        // handle any errors that occur during the database query
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getDoctorsPatient = async (req, res) => {
    const patientID = req.params.id
    const patient = await Patient.findById(patientID);

    if (!patient) {
        return res.status(404).json({ message: 'Doctor not found' });
    }
    // if the doctor is found, send it as a JSON response
    res.json(patient);
}

export const listAllDoctors = async (req, res) => {
    var doctors = await Doctor.find({})
    console.log(doctors)
    res.send(doctors)
    // res.send("great success")
}

export const getDoctorById = async (req, res) => {
    const doctorId = req.params.id;

    // perform a database query or any other action to retrieve the doctor by ID
    // replace the following line with your actual database retrieval logic
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
    }
    // if the doctor is found, send it as a JSON response
    res.json(doctor);
}