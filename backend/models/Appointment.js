import {mongoose} from "mongoose"

// const appointmentSchema = new Schema({
//     doctorID :{type: Schema.Types.ObjectId,ref:'Doctor',required:true},
//     patientID :{type: Schema.Types.ObjectId,ref:'Patient',required:true},
//     time : {type:Date,default:()=> new Date()}
//   });

const appointmentSchema = new mongoose.Schema({
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient', // Reference to the Patient model
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor', // Reference to the Doctor model
    },
    time: Date,
  });
export default mongoose.model('Appointment', appointmentSchema);