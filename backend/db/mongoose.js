import mongoose from 'mongoose'

mongoose
  .connect(
    "mongodb+srv://ilhansyed:devrev123@cluster0.daiu1xh.mongodb.net/?retryWrites=true&w=majority", 
    {
    useNewUrlParser: true,
    useUnifiedTopology:true
  })
  .then(console.log("mongo connected"));

