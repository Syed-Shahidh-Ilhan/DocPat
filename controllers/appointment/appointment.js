import Appointment from "../../models/Appointment.js"
import Doctor from "../../models/Doctor.js"

export const createAppointment = async (req, res) => {
    try {
        // checking if the doctor exists
        const doctor = await Doctor.findById(req.body.doctorId);
        if (!doctor) {
            res.json({ status: 0, message: "doctor does not exist" });
            return;
        }
        const date = new Date(req.body.time);

        // checking the time slots are booked already or not
        const booked = await Appointment.findOne({ doctorId: req.body.doctorId, time: date });
        if(booked) {
            res.json({ status: 0, message: "time slot not available - already booked" });
            return;
        }
        const hour = date.getHours();
        if(hour < 9 && hour > 18) {
            res.json({ status: 0, message: "time outside working hours" });
            return;
        }
        await Appointment.create({ patientId: req.user.id, doctorId: req.body.doctorId, time: date });
        res.json({ status: 1, message: "appointment created successfully" });
    } catch (error) {
        res.json({ status: 0, message: error.message })
    }
}

export const getDoctorAppointments = async (req, res) => {
    try {
        const result = await Appointment.find({ doctorId: req.body.doctorId }).populate("patientId");    // using find function to get all appointments for doctor
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export const getPatientAppointments = async (req, res) => {
    try {
        const result = await Appointment.find({ patientId: req.body.patientId }).populate("doctorId");   // using find function to get all appointments for patient
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

// remove this
export const getAppointments = async (req, res) => {
    const id = req.user.id; // getting id of user from req object
    if (req.user.role === "Doctor") {
        try {
            const result = await Appointment.find({ doctorId: id }).populate("patientId");    // using find function to get all appointments for doctor
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send(error.message);
        }
    } else if (req.user.role === "Patient") {
        try {
            const result = await Appointment.find({ patientId: id }).populate("doctorId");   // using find function to get all appointments for patient
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    } else {
        res.status(500).send("Server Error");
    }
}

export const updateAppointment = async (req, res) => {
    const appointmentId = req.body.appointmentId;
    try {
        const result = await Appointment.findByIdAndUpdate(appointmentId, req.body); // finding by id and updating the appointment time
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export const deleteAppointment = async (req, res) => {
    const appointmentId = req.body.appointmentId;
    try {
        const result = await Appointment.findByIdAndDelete(appointmentId);  // finding by id and deleting 
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}