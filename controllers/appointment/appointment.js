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
    const id = req.user.id;
    if (req.user.role === "Doctor") {
        const result = await Appointment.find({ doctorId: id });
        res.send(200).send(result);
    } else if (req.user.role === "Patient") {
        const result = await Appointment.find({ patientId: id });
        res.send(200).send(result);
    }
}

export const updateAppointment = async (req, res) => {

}

export const deleteAppointment = async (req, res) => {

}