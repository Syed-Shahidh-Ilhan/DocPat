import {mongoose} from "mongoose"
const {Schema} = mongoose

const patientSchema = new Schema({
  name:{type:String,required:true}
  });

export default mongoose.model('Patient', patientSchema);