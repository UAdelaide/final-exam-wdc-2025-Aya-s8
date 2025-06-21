const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();
const dogRoutes = require('./routes/dogs');
const app = express();
app.use('/api/dogs', dogRoutes);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'dog-walking-secret',
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/auth');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
app.use('/api', authRoutes);

module.exports = app;
