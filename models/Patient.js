import { mongoose } from "mongoose"
import bcrypt from "bcrypt"
const patientSchema = new mongoose.Schema(
  {

  name:{
    type:String,
    required:true
  },

  age:{
    type:Number,
    required:true
  },

  sex:{
    type:String, 
    enum: ["Male", "Female", "Intersex"], 
    required: true 
  },
  // Assuming this field is for the patient's email address
  email: { 
    type: String, 
    required:true
  }, 
  password: { 
    type: String, 
    required:true 
  } // Assuming this field is for the patient's password
  }
);

patientSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
export default mongoose.model('Patient', patientSchema);