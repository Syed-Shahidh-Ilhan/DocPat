import jwt from "jsonwebtoken"
import "dotenv/config";
import Doctor from "../../models/Doctor.js";
import Patient from "../../models/Patient.js";
const auth = (req, res, next) => {
    const token = req.headers.authorization
    try {
        const { id, role } = jwt.verify(token.split(" ")[1], process.env.JWTSECRET);
        req.user = { id, role }; //to be removed
        req.body[`${role.toLowerCase()}Id`] = id
        next();
    } catch (error) {
        res.status(401).json({message: "unauthorized" });
    }
}

export const validDoctor = async (req,res,next)=>{
    try{
    var doctorId = req.body.doctorId
    var doctor = await Doctor.findOne({_id:doctorId}).select({password:0,__v:0}) //excluding password and version fields
    if(!doctor)return res.status(400).json({message:`doctor with ID ${doctorId} does not exist`})
    res.locals.doctor = doctor //Indirectly passing doctor object for following middlewares
    next()}
    catch(error){
        res.status(500).send(error)
    }
}
export const validPatient = async (req,res,next)=>{
    try{
    var patientId = req.body.patientId
    var patient = await Patient.findOne({_id:patientId}).select({password:0,__v:0}) //excluding password and version fields
    if(!patient)return res.status(400).json({message:`patient with ID ${patientId} does not exist`})
    res.locals.patient = patient //Indirectly passing patient object for following middlewares
    next()}
    catch(error){
        res.status(500).send(error)
    }
}

// export const validAppointment = async(req,res,next)=>{
//     try{
//     // first check if the logged in user is patient or doctor
        
//     // then get appointmentid from req.body
//     // find appointment by appointment id and doctor id 
        
//     }
//     catch{

//     }
// }
export default auth