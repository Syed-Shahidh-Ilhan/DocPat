// import jwt from "jsonwebtoken"
import Patient from "../../models/Patient.js"
import Appointment from "../../models/Appointment.js"
import Doctor from "../../models/Doctor.js"
// import bcrypt from "bcrypt"

export const createAppointment = async (req, res) => {
    if (req.user.role === "Doctor") {

    } else if (req.user.role === "Patient") {
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
}

export const getAppointments = async (req, res) => {
    const id = req.user.id; // getting id of user from req object
    if (req.user.role === "Doctor") {
        try {
            const result = await Appointment.find({ doctorId: id });    // using find function to get all appointments for doctor
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    } else if (req.user.role === "Patient") {
        try {
            const result = await Appointment.find({ patientId: id });   // using find function to get all appointments for patient
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}

export const updateAppointment = async (req, res) => {
    const appointmentId = req.appointmentId;
    try {
        const result = await Appointment.findByIdAndUpdate(appointmentId, req.body); // finding by id and updating the appointment time
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const deleteAppointment = async (req, res) => {
    const appointmentId = req.appointmentId;
    try {
        const result = await Appointment.findByIdAndDelete(appointmentId);  // finding by id and deleting 
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}