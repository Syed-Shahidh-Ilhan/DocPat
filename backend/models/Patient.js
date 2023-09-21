import {mongoose} from "mongoose"

const patientSchema = new mongoose.Schema({
  name:{type:String,required:true},
  age:{type:Number,required:true},
  sex:{type:String, enum: ["Male", "Female", "Intersex"], required: true },
  mail: { type: String, required:true}, // Assuming this field is for the patient's email address
  password: { type: String, required:true } // Assuming this field is for the patient's password
});

export default mongoose.model('Patient', patientSchema);