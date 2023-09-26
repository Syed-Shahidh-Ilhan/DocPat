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
        await Appointment.create({ patientId: req.user.id, doctorId: req.body.doctorId, time: date, status: 'booked' });
        res.json({ status: 1, message: "appointment created successfully" });
    } catch (error) {
        res.json({ status: 0, message: error.message })
    }
}

export const getDoctorAppointments = async (req, res) => {
    const sortingOrder = req.query.sort;
    const currentTime = Date.now();
    try {
        const pastAppointments = await Appointment.find({ doctorId: req.body.doctorId, time: {$lt: currentTime} }).populate("patientId").sort({
            time: sortingOrder === 'a' ? 1 : -1
        });    // using find function to get all appointments for doctor
        const futureAppointments = await Appointment.find({ doctorId: req.body.doctorId, time: {$gt: currentTime} }).populate("patientId").sort({
            time: sortingOrder === 'a' ? 1 : -1
        });
        res.status(200).send({pastAppointments, futureAppointments});
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export const getPatientAppointments = async (req, res) => {
    const sortingOrder = req.query.sort;
    const currentTime = Date.now();
    try {
        const pastAppointments = await Appointment.find({ patientId: req.body.patientId, time: {$lt: currentTime} }).populate("doctorId").sort({
            time: sortingOrder === 'a' ? 1 : -1
        });    // using find function to get all appointments for doctor
        const futureAppointments = await Appointment.find({ patientId: req.body.patientId, time: {$gt: currentTime} }).populate("doctorId").sort({
            time: sortingOrder === 'a' ? 1 : -1
        });
        res.status(200).send({pastAppointments, futureAppointments});
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export const updateAppointment = async (req, res) => {
    // const appointment = res.locals.appointment (Appointment object)
    const appointmentId = req.body.appointmentId;
    const date = new Date(req.body.time);
    try {
        const existingAppointmentTime = await Appointment.find({time: date});
        if(existingAppointmentTime) {
            return res.status(200).send("appointment time already exist")
        }
        const result = await Appointment.findByIdAndUpdate(appointmentId, req.body); // finding by id and updating the appointment time
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export const deleteAppointment = async (req, res) => {
    const appointmentId = req.params.appointmentId;
    try {
        const result = await Appointment.findByIdAndDelete(appointmentId);  // finding by id and deleting 
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}