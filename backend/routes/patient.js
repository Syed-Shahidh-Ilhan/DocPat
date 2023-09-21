import express from "express"
import "dotenv/config"
const router = express.Router()
import doctorRoutes from "./patient/doctors.js"
import patientRoutes from "./patient/patients.js"
import appointmentRoutes from "./patient/appointments.js"
import jwt from "jsonwebtoken"
//middleware
function auth(req,res,next){
    const authHead = req.headers.authorization
    if(authHead){
    const token = authHead.split(" ")[1]
    const {email,password} = jwt.verify(token,process.env.JWTSECRET)
    req.user = {}
    req.user.email = email
    req.user.password = password
    next()}
    else{
        res.send("unauthorized")
    }
}

//handlers
router.post('/signin',async(req,res)=>{
    const {email,password,name,age,gender} = req.body
    res.redirect("/patient/login")
})
router.post('/login',async (req,res)=>{
    const {email,password} = req.body
    const payload={email:email,password:password}
    const token = jwt.sign(payload,process.env.JWTSECRET)
    res.send(token)
})
router.get('/details',auth,async(req,res)=>{
    res.send(`email ${req.user.email} and password ${req.user.password}`)
})

//routes
router.use('/doctor',doctorRoutes)
router.use('/patient',patientRoutes)
router.use('/appointment',appointmentRoutes)
export default router