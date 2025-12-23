const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


require('dotenv').config();


const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const lessonRoutes = require('./routes/lessonRoutes');

const app = express();



// Middleware
app.use(cors({
  origin: [
    "https://project-a0dk10uqe-rathodshaabs-projects.vercel.app/login",  
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);



// MongoDB connection
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
