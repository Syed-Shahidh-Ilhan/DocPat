import {mongoose} from "mongoose"
const {Schema} = mongoose

const appointmentSchema = new Schema({
    doctorId :{type: Schema.Types.ObjectId, ref: 'Doctor'},
    patientId :{type: Schema.Types.ObjectId, ref: 'Patient'},
    time : {type:Date,default:()=> new Date()}
  });