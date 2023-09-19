import {mongoose} from "mongoose"
const {Schema} = mongoose

const patientSchema = new Schema({
    name: String
  });

exports = mongoose.model('Patient', patientSchema);