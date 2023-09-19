import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import './db/mongoose.js'
import cors from 'cors';

import doctorRoutes from './routes/doctors.js';
import patientRoutes from './routes/patients.js';

const app = express();
const port = process.env.PORT || 3000; // You can change the port number as needed

// Middleware to handle CORS (Cross-Origin Resource Sharing)
app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());

// Define a sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Doctor Routes
app.use('/doctor', doctorRoutes);

// Patient Routes
app.use('/patient', patientRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
