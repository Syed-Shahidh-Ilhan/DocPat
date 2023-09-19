import {mongoose} from "mongoose"
const {Schema} = mongoose

const doctorSchema = new Schema({
    name: String
});

exports = mongoose.model('Doctor', doctorSchema);