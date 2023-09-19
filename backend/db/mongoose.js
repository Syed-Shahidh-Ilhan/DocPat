import mongoose from 'mongoose'
import 'dotenv/config'
mongoose
  .connect(
    process.env.CONNECTIONSTRING,
    {
    useNewUrlParser: true,
    useUnifiedTopology:true
  })
  .then(console.log("mongo connected"));