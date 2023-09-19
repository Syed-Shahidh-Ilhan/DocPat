const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.connectionString, 
    {
    useNewUrlParser: true,
    useUnifiedTopology:true
  })
  .then(console.log("mongo connected"));