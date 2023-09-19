import {mongoose} from "mongoose"
const {Schema} = mongoose

const appointmentSchema = new Schema({
    doctorID :{type: Schema.Types.ObjectId,ref:'Doctor',required:true},
    patientID :{type: Schema.Types.ObjectId,ref:'Patient',required:true},
    time : {type:Date,default:()=> new Date()}
  });
export default mongoose.model('Appointment', appointmentSchema);