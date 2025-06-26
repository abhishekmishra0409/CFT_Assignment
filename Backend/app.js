const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


//Health check route
app.get('/health-check', (req, res) => {
    res.status(200).json({ message: 'Server is running smoothly' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

// 404 route
app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});

module.exports = app;