import express from 'express';
import Patient from "../models/Patient.js"
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;
const router = express.Router();


router.post('/create',async (req,res)=>{
    const patientName = req.body.name
    var patient = new Patient()
    patient.name = patientName
    await patient.save()
    res.send("successfully created")
})

router.get('/list',async (req,res)=>{
    var patients = await Patient.find({})
    res.send(patients)
})

export default router;