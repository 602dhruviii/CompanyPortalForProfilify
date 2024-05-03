const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000; // Choose a port for your server

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/companydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
}));

// Define a schema for your form data
const openingSchema = new mongoose.Schema({
  companyName: String,
  jobProfile: String,
  jobType: String,
  location: String,
  salary: Number,
  jobDescription: String
});

const Opening = mongoose.model('Opening', openingSchema);

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/api/openings', async (req, res) => {
  try {
    const newOpening = new Opening(req.body);
    await newOpening.save();
    res.status(201).json(newOpening);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get all openings
app.get('/api/openings', async (req, res) => {
  try {
    const openings = await Opening.find();
    res.status(200).json(openings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
