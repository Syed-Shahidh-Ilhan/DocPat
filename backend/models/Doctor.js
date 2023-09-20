import {mongoose} from "mongoose"
const {Schema} = mongoose

const doctorSchema = new Schema({
    name: {type:String,required:true}
});

export default  mongoose.model('Doctor', doctorSchema);