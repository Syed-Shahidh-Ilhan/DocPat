import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";
import "./mongoose.js";

await Appointment.deleteMany({})
console.log("completed")