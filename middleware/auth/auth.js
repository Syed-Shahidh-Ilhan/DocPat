import jwt from "jsonwebtoken"
import "dotenv/config";
import Doctor from "../../models/Doctor.js";
import Patient from "../../models/Patient.js";
const auth = (req, res, next) => {
    const token = req.headers.authorization
    try {
        const { id, role } = jwt.verify(token.split(" ")[1], process.env.JWTSECRET);
        req.user = { id, role };
        req.body[`${role.toLowerCase()}Id`] = id
        next();
    } catch (error) {
        console.log(error);
        res.json({ status: -1, message: "unauthorized" });
    }
}

export const validDoctor = async (req,res,next)=>{
    try{
    var doctorId = req.body.doctorId
    var doctor = await Doctor.findOne({_id:doctorId}).select({password:0,__v:0})
    if(!doctor)return res.status(400).json({message:`doctor with ID ${doctorId} does not exist`})
    res.locals.doctor = doctor
    next()}
    catch(error){
        res.status(500).send(error)
    }
}
export const validPatient = async (req,res,next)=>{
    try{
    var patientId = req.body.patientId
    var patient = await Patient.findOne({_id:patientId}).select({password:0,__v:0})
    if(!patient)return res.status(400).json({message:`patient with ID ${patientId} does not exist`})
    res.locals.patient = patient
    next()}
    catch(error){
        res.status(500).send(error)
    }
}
export default auth