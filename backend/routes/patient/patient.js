import express from "express"
import "dotenv/config"
const router = express.Router()
import jwt from "jsonwebtoken"
import Patient from "../../models/Patient.js"
import Doctor from "../../models/Doctor.js"
import bcrypt from "bcrypt"
//middleware
function auth(req,res,next){
    const token = req.headers.authorization
    try{
    const {id,role} = jwt.verify(token,process.env.JWTSECRET)
    req.user = {}
    req.user.id = id
    req.user.role = role
    next()}
    catch{
        res.json({status:0,message:"unauthorized"})
    }
}
//public Endoints
router.post('/signin',async(req,res)=>{
    const email = req.body.email
    if(await Patient.findOne({email:email})){
        return res.json({status:0,message:`User with email ${email} already exists`})
    }
    var patient = new Patient(req.body)
    await patient.save()
    res.json({status:1,message:"success"})
})
router.post('/login',async (req,res)=>{
    const {email,password} = req.body
    const user = await Patient.findOne({email:email})
    if(!user){
        return res.json({status:0,message:`User with email ${email} does not exists`})
    }
    if(!await bcrypt.compare(password, user.password)){
        return res.send({status:0,message:"Invalid password"})
    }
    const payload={id:user._id,role:"Patient"}
    const token = jwt.sign(payload,process.env.JWTSECRET)
    res.json({status:1,message:"success",authToken:token})
})
router.post('/getDoctors',auth,async(req,res)=>{
    const options = req.body
    const doctors = await Doctor.find(options).select({_id:0,password:0,__v:0})
    res.send(doctors)
})

//Temp Dev Endpoints
router.get('/list',async(req,res)=>{
    var patients = await Patient.find({})
    res.send(patients)
})
router.get('/details',auth,async(req,res)=>{
    var patient = await Patient.findOne({'_id':req.user.id})
    res.send(patient)
})

export default router